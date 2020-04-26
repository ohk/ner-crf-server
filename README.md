<h1 align="center">Welcome to ner-crf-server 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ohkamisli/ner-crf-server/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ohkamisli/ner-crf-server/blob/master/LICENSE" target="_blank">
    <img alt="License: GPL--3.0--or--later" src="https://img.shields.io/github/license/ohkamisli/ner-crf-server" />
  </a>
  <a href="https://twitter.com/ohkamisli" target="_blank">
    <img alt="Twitter: ohkamisli" src="https://img.shields.io/twitter/follow/ohkamisli.svg?style=social" />
  </a>
</p>

> Based on https://nlp.stanford.edu/software/CRF-NER.html

### 🏠 [Homepage](https://github.com/ohkamisli/ner-crf-server#readme)

With this module, you can use the ner server developed by stanford-ner in your own projects. All the improvements made within the scope of this project are listed below.

## Install

```sh
npm install ner-crf-server
```

## Usage

The usage scenarios of all functions are below.

### Server

The functions in this section are used to start, stop and communicate with the NER server.

#### Constructor

Params:

    1. hostname
    2. port
    3. Classifier name/path (It is strongly recommended to give full path.)

    Warnings
      Never give an extension for the Classifier.
      Just add the file directory + classfier Name for the Classifier.

```
const { Server } = require('ner-crf-server')

const server = new Server("localhost",9000,"sample")
```

#### server.start()

Starts the server. It takes the necessary parameters from Constructor.

```
const { Server } = require('ner-crf-server')

const server = new Server("localhost",9000,"sample")

server.start()

```

#### server.stop()

Stops the server. It takes the necessary parameters from Constructor.

```
const { Server } = require('ner-crf-server')

const server = new Server("localhost",9000,"sample")

server.start()

server.stop()

```

#### server.post(TEXT, callback)

It provides communication with the server. When you give the text, it gives you back as tagged.

```
server.post(TEXT, (err, res) => {
    console.log(err)
    console.log(res)
})
```

Example INPUT

    server.post(
        "İki eli kanda bile olsa, her sabah banyo alırdı.\
        Trablus ' ta Çanakkale ' de Sakarya ' da, savaşların en kritik günlerinde ne yapar eder, tenekeyle su ısıtır, çadırında yıkanırdı.\
        Derne'deyken bir vahada çamur içinde su bulmuşlardı, tülbentlerle süzüp biriktirmişlerdi, içmek için saklıyorlardı, susuz kalma ihtimaline rağmen her sabah bu suyla yüzünü yıkamaktan vazgeçmezdi.\
        1920'de Ankara ' ya gelip istasyon binasına yerleştiğinde, ilk sorduğu soru “ banyo işine nasıl çare bulacağız ? ” olmuştu.\
        Demiryolu ustalarının yardımıyla sactan küvet yaptırılmış, yatak odasına konulmuştu, Çankaya'ya taşınana kadar 1.5 yıl onu kullandı.\
        1925 ' te Kastamonu'dan gelirken Çankırı'da konakladı, yıkanmak istedi, banyo yoktu, etrafa haber salındı, tenekeci ustası bulundu, banyo teknesi yaptırıldı, odasına yerleştirildi, hastaneden semaver getirildi, üstüne kazanla su konuldu… Bu semaveri yıllarca gülerek anlattı.\
        Cumhurbaşkanı olduktan sonra Dolmabahçe ' de Florya ' da Yalova ' da sıcak yaz günlerinde sabah akşam iki defa banyo alırdı.\
        Akşam balo, konser veya düğün gibi bir program varsa, kış ayları bile olsa tekrar yıkanmadan gitmezdi.\
        1938 ' de neredeyse ölüm döşeğindeyken, karnından iğneyle 12 litre su çekildiğinde bile “ banyoya girebilir miyim ? ” diye soruyordu .",
        (err, res) => {
            console.log(err)
            console.log(res)
        }
    )

Example OUTPUT

    [
      { id: 0, word: 'İki', tag: 'O' }
      { id: 1, word: 'eli', tag: 'O' }
      { id: 2, word: 'kanda', tag: 'O' }
      { id: 3, word: 'bile', tag: 'O' }
      { id: 4, word: 'olsa,', tag: 'O' }
      { id: 5, word: 'her', tag: 'O' }
      { id: 6, word: 'sabah', tag: 'O' }
      { id: 7, word: 'banyo', tag: 'O' }
      { id: 8, word: 'alırdı.', tag: 'O' }
      { id: 9, word: 'Trablus', tag: 'LOCATION' }
      { id: 10, word: "'", tag: 'O' }
      { id: 11, word: 'ta', tag: 'O' }
      { id: 12, word: 'Çanakkale', tag: 'LOCATION' }
      { id: 13, word: "'", tag: 'O' }
      { id: 14, word: 'de', tag: 'O' }
      { id: 15, word: 'Sakarya', tag: 'LOCATION' }
      { id: 16, word: "'", tag: 'O' }
      { id: 17, word: 'da,', tag: 'O' }
      { id: 18, word: 'savaşların', tag: 'O' }
      { id: 19, word: 'en', tag: 'O' }
      { id: 20, word: 'kritik', tag: 'O' }
      { id: 21, word: 'günlerinde', tag: 'O' }
      { id: 22, word: 'ne', tag: 'O' }
      { id: 23, word: 'yapar', tag: 'O' }
      { id: 24, word: 'eder,', tag: 'O' }
      { id: 25, word: 'tenekeyle', tag: 'O' }
      { id: 26, word: 'su', tag: 'O' }
      { id: 27, word: 'ısıtır,', tag: 'O' }
      { id: 28, word: 'çadırında', tag: 'O' }
      { id: 29, word: 'yıkanırdı.', tag: 'O' }
      { id: 30, word: "Derne'deyken", tag: 'O' }
      { id: 31, word: 'bir', tag: 'O' }
      { id: 32, word: 'vahada', tag: 'O' }
      { id: 33, word: 'çamur', tag: 'O' }
      { id: 34, word: 'içinde', tag: 'O' }
      { id: 35, word: 'su', tag: 'O' }
      { id: 36, word: 'bulmuşlardı,', tag: 'O' }
      { id: 37, word: 'tülbentlerle', tag: 'O' }
      { id: 38, word: 'süzüp', tag: 'O' }
      { id: 39, word: 'biriktirmişlerdi,', tag: 'O' }
      { id: 40, word: 'içmek', tag: 'O' }
      { id: 41, word: 'için', tag: 'O' }
      { id: 42, word: 'saklıyorlardı,', tag: 'O' }
      { id: 43, word: 'susuz', tag: 'O' }
      { id: 44, word: 'kalma', tag: 'O' }
      { id: 45, word: 'ihtimaline', tag: 'O' }
      { id: 46, word: 'rağmen', tag: 'O' }
      { id: 47, word: 'her', tag: 'O' }
      { id: 48, word: 'sabah', tag: 'O' }
      { id: 49, word: 'bu', tag: 'O' }
      { id: 50, word: 'suyla', tag: 'O' }
      { id: 51, word: 'yüzünü', tag: 'O' }
      { id: 52, word: 'yıkamaktan', tag: 'O' }
      { id: 53, word: 'vazgeçmezdi.', tag: 'O' }
      { id: 54, word: "1920'de", tag: 'O' }
      { id: 55, word: 'Ankara', tag: 'LOCATION' }
      { id: 56, word: "'", tag: 'O' }
      { id: 57, word: 'ya', tag: 'O' }
      { id: 58, word: 'gelip', tag: 'O' }
      { id: 59, word: 'istasyon', tag: 'O' }
      { id: 60, word: 'binasına', tag: 'O' }
      { id: 61, word: 'yerleştiğinde,', tag: 'O' }
      { id: 62, word: 'ilk', tag: 'O' }
      { id: 63, word: 'sorduğu', tag: 'O' }
      { id: 64, word: 'soru', tag: 'O' }
      { id: 65, word: '“', tag: 'O' }
      { id: 66, word: 'banyo', tag: 'O' }
      { id: 67, word: 'işine', tag: 'O' }
      { id: 68, word: 'nasıl', tag: 'O' }
      { id: 69, word: 'çare', tag: 'O' }
      { id: 70, word: 'bulacağız', tag: 'O' }
      { id: 71, word: '?', tag: 'PERSON' }
      { id: 72, word: '”', tag: 'PERSON' }
      { id: 73, word: 'olmuştu.', tag: 'O' }
      { id: 74, word: 'Demiryolu', tag: 'O' }
      { id: 75, word: 'ustalarının', tag: 'O' }
      { id: 76, word: 'yardımıyla', tag: 'O' }
      { id: 77, word: 'sactan', tag: 'O' }
      { id: 78, word: 'küvet', tag: 'O' }
      { id: 79, word: 'yaptırılmış,', tag: 'O' }
      { id: 80, word: 'yatak', tag: 'O' }
      { id: 81, word: 'odasına', tag: 'O' }
      { id: 82, word: 'konulmuştu,', tag: 'O' }
      { id: 83, word: "Çankaya'ya", tag: 'O' }
      { id: 84, word: 'taşınana', tag: 'O' }
      { id: 85, word: 'kadar', tag: 'O' }
      { id: 86, word: '1.5', tag: 'O' }
      { id: 87, word: 'yıl', tag: 'O' }
      { id: 88, word: 'onu', tag: 'O' }
      { id: 89, word: 'kullandı.', tag: 'O' }
      { id: 90, word: '1925', tag: 'O' }
      { id: 91, word: "'", tag: 'O' }
      { id: 92, word: 'te', tag: 'O' }
      { id: 93, word: "Kastamonu'dan", tag: 'O' }
      { id: 94, word: 'gelirken', tag: 'O' }
      { id: 95, word: "Çankırı'da", tag: 'O' }
      { id: 96, word: 'konakladı,', tag: 'O' }
      { id: 97, word: 'yıkanmak', tag: 'O' }
      { id: 98, word: 'istedi,', tag: 'O' }
      { id: 99, word: 'banyo', tag: 'O' }
      { id: 100, word: 'yoktu,', tag: 'O' }
      { id: 101, word: 'etrafa', tag: 'O' }
      { id: 102, word: 'haber', tag: 'O' }
      { id: 103, word: 'salındı,', tag: 'O' }
      { id: 104, word: 'tenekeci', tag: 'O' }
      { id: 105, word: 'ustası', tag: 'O' }
      { id: 106, word: 'bulundu,', tag: 'O' }
      { id: 107, word: 'banyo', tag: 'O' }
      { id: 108, word: 'teknesi', tag: 'O' }
      { id: 109, word: 'yaptırıldı,', tag: 'O' }
      { id: 110, word: 'odasına', tag: 'O' }
      { id: 111, word: 'yerleştirildi,', tag: 'O' }
      { id: 112, word: 'hastaneden', tag: 'O' }
      { id: 113, word: 'semaver', tag: 'O' }
      { id: 114, word: 'getirildi,', tag: 'O' }
      { id: 115, word: 'üstüne', tag: 'O' }
      { id: 116, word: 'kazanla', tag: 'O' }
      { id: 117, word: 'su', tag: 'O' }
      { id: 118, word: 'konuldu…', tag: 'O' }
      { id: 119, word: 'Bu', tag: 'O' }
      { id: 120, word: 'semaveri', tag: 'O' }
      { id: 121, word: 'yıllarca', tag: 'O' }
      { id: 122, word: 'gülerek', tag: 'O' }
      { id: 123, word: 'anlattı.', tag: 'O' }
      { id: 124, word: 'Cumhurbaşkanı', tag: 'O' }
      { id: 125, word: 'olduktan', tag: 'O' }
      { id: 126, word: 'sonra', tag: 'O' }
      { id: 127, word: 'Dolmabahçe', tag: 'LOCATION' }
      { id: 128, word: "'", tag: 'O' }
      { id: 129, word: 'de', tag: 'O' }
      { id: 130, word: 'Florya', tag: 'LOCATION' }
      { id: 131, word: "'", tag: 'O' }
      { id: 132, word: 'da', tag: 'O' }
      { id: 133, word: 'Yalova', tag: 'LOCATION' }
      { id: 134, word: "'", tag: 'O' }
      { id: 135, word: 'da', tag: 'O' }
      { id: 136, word: 'sıcak', tag: 'O' }
      { id: 137, word: 'yaz', tag: 'O' }
      { id: 138, word: 'günlerinde', tag: 'O' }
      { id: 139, word: 'sabah', tag: 'O' }
      { id: 140, word: 'akşam', tag: 'O' }
      { id: 141, word: 'iki', tag: 'O' }
      { id: 142, word: 'defa', tag: 'O' }
      { id: 143, word: 'banyo', tag: 'O' }
      { id: 144, word: 'alırdı.', tag: 'O' }
      { id: 145, word: 'Akşam', tag: 'O' }
      { id: 146, word: 'balo,', tag: 'O' }
      { id: 147, word: 'konser', tag: 'O' }
      { id: 148, word: 'veya', tag: 'O' }
      { id: 149, word: 'düğün', tag: 'O' }
      { id: 150, word: 'gibi', tag: 'O' }
      { id: 151, word: 'bir', tag: 'O' }
      { id: 152, word: 'program', tag: 'O' }
      { id: 153, word: 'varsa,', tag: 'O' }
      { id: 154, word: 'kış', tag: 'O' }
      { id: 155, word: 'ayları', tag: 'O' }
      { id: 156, word: 'bile', tag: 'O' }
      { id: 157, word: 'olsa', tag: 'O' }
      { id: 158, word: 'tekrar', tag: 'O' }
      { id: 159, word: 'yıkanmadan', tag: 'O' }
      { id: 160, word: 'gitmezdi.', tag: 'O' }
      { id: 161, word: '1938', tag: 'O' }
      { id: 162, word: "'", tag: 'O' }
      { id: 163, word: 'de', tag: 'O' }
      { id: 164, word: 'neredeyse', tag: 'O' }
      { id: 165, word: 'ölüm', tag: 'O' }
      { id: 166, word: 'döşeğindeyken,', tag: 'O' }
      { id: 167, word: 'karnından', tag: 'O' }
      { id: 168, word: 'iğneyle', tag: 'O' }
      { id: 169, word: '12', tag: 'O' }
      { id: 170, word: 'litre', tag: 'O' }
      { id: 171, word: 'su', tag: 'O' }
      { id: 172, word: 'çekildiğinde', tag: 'O' }
      { id: 173, word: 'bile', tag: 'O' }
      { id: 174, word: '“', tag: 'O' }
      { id: 175, word: 'banyoya', tag: 'O' }
      { id: 176, word: 'girebilir', tag: 'O' }
      { id: 177, word: 'miyim', tag: 'O' }
      { id: 178, word: '?', tag: 'PERSON' }
      { id: 179, word: '”', tag: 'PERSON' }
      { id: 180, word: 'diye', tag: 'O' }
      { id: 181, word: 'soruyordu', tag: 'O' }
      { id: 182, word: '.', tag: 'O' }
    ]

### Classifier

#### Constructor

Params:

    1. trainFileName : The file to be used to train the model. You must provide full path.
    2. modelName : Classifier name/path (It is strongly recommended to give full path.)
    3. options : Option Array. Details below.

    Warnings
      Never give an extension for the trainFileName.
      Just add the file directory + classfier Name for the Classifier.

```
const classifier = new Classifier('trainFile', 'sample', {})

```

#### createProp()

Creates the prop file to be used to create the model. It takes the necessary parameters from the constructor.

```
const classifier = new Classifier('trainFile', 'sample', {})
classifier.createProp()
```

#### train()

It trains the model with the data it receives from the prop.

```
const classifier = new Classifier('trainFile', 'sample', {})
classifier.createProp()
classifier.train()
```

#### OPTIONS

You can learn the details of the options available during the training from [this address](https://nlp.stanford.edu/software/crf-faq.shtml#a). All options are provided by stanford-ner.

## Author

👤 **Omer Hamid Kamisli**

-   Website: ohkamisli.com
-   Twitter: [@ohkamisli](https://twitter.com/ohkamisli)
-   Github: [@ohkamisli](https://github.com/ohkamisli)
-   LinkedIn: [@ohkamisli](https://linkedin.com/in/ohkamisli)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ohkamisli/ner-crf-server/issues). You can also take a look at the [contributing guide](https://github.com/ohkamisli/ner-crf-server/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/ohkamisli">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2020 [Omer Hamid Kamisli](https://github.com/ohkamisli).<br />
This project is [GPL--3.0--or--later](https://github.com/ohkamisli/ner-crf-server/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
