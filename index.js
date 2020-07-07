const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const { spawn, exec } = require('child_process')
const net = require('net')
const tsvParser = require('./ner/tsvParser')
const terminate = require('terminate')

class Server {
    /**
     * This function communicates with the NER server on the specified port.
     * Check the Examples folder for the example.
     * @param {String} text
     * @param {*} callback
     */
    async post(text, callback) {
        var socket = new net.Socket()

        socket.connect(this.port, this.host, function () {
            socket.setNoDelay(true)
            socket.write(text.replace(/\r?\n|\r|\t/g, ' ') + '\n')
        })
        socket.on('data', function (data) {
            var re = /<([A-Z]+?)>(.+?)<\/\1>/g
            var str = data.toString()
            var res = {}
            res.tags = tsvParser(str)

            socket.destroy()
            callback(undefined, res)
        })
        socket.on('error', function (err) {
            callback(err, undefined)
        })
    }

    /**
     * The function that should be used to start the server.
     * All of the parameters in the function come from constructor.
     * @param {String} classifierName from constructor.
     * @param {Number} port from constructor
     * @return {Object} exec info
     */
    start() {
        let command = `java -Xmx8g -Xms1024m -cp "${this.nerPath}:${this.libPath}" edu.stanford.nlp.ie.NERServer  -loadClassifier ${this.classifier} -port ${this.port} -tokenizerFactory edu.stanford.nlp.process.WhitespaceTokenizer -tokenizerOptions tokenizeNLs=false -outputFormat tsv`
        console.log(`NER Server started on port ${this.port}`)
        const process = exec(command, { shell: true })
        this.process = process
        return process
    }
    /**
     * The function that should be used to start the server.
     * All of the parameters in the function come from start function.
     * @param {Number} processId from start function
     */
    stop() {
        terminate(this.process.pid, (err, done) => {
            if (err) {
                console.log('Oopsy: ' + err)
            } else {
                console.log('Server closed!')
            }
        })
    }

    setClassifier(classifier) {
        this.classifier = classifier
        return this.classifier
    }
    /**
     * Constructor function.
     * All of the parameters are required.
     * It will definitely not work if any parameter is missing.
     * @param {*} host Server host
     * @param {*} port Server port
     * @param {*} classifier Classifier full path without extension (__dirname+'classifierName')
     */
    constructor(host, port, classifier) {
        this.host = host
        this.port = port
        this.classifier = classifier
        this.nerPath = path.join(__dirname, './ner/stanford-ner.jar')
        this.libPath = path.join(__dirname, './ner/lib/*')
    }
}

class Classifier {
    /**
     *
     */
    train() {
        if (this.trainFileName === undefined || this.trainFileName === null) {
            console.log('Please give a train file name')
            return -1
        }
        let shellCommand = `java -Xmx8g -cp ${this.nerPath} edu.stanford.nlp.ie.crf.CRFClassifier -prop ${this.propPath}`
        shell.exec(shellCommand)
    }

    createProp() {
        let content = `
        trainFile = ${this.trainFileName}
        serializeTo = ${this.modelName}.ser.gz
        map = word=0,answer=1
        maxLeft=${this.maxLeft}
        useClassFeature=${this.useClassFeature}
        useWord=${this.useWord}
        useNGrams=${this.useNGrams}
        noMidNGrams=${this.noMidNGrams}
        maxNGramLeng=${this.maxNGramLeng}
        usePrev=${this.usePrev}
        useNext=${this.useNext}
        useDisjunctive=${this.useDisjunctive}
        useSequences=${this.useSequences}
        usePrevSequences=${this.usePrevSequences}
        useTypeSeqs=${this.useTypeSeqs}
        useTypeSeqs2=${this.useTypeSeqs2}
        useTypeySequences=${this.useTypeySequences}
        wordShape=${this.wordShape}
        `
        fs.ensureFileSync(this.propPath)
        fs.writeFileSync(this.propPath, content)
    }

    constructor(trainFileName, modelName, options) {
        if (options === undefined) {
            options = {}
        }
        let maxLeftV = options.maxLeft !== undefined ? options.maxLeft : 1
        let useClassFeatureV = options.useClassFeature !== undefined ? options.useClassFeature : true
        let useWordV = options.useWord !== undefined ? options.useWord : true
        let useNGramsV = options.useNGrams !== undefined ? options.useNGrams : true
        let noMidNGramsV = options.noMidNGrams !== undefined ? options.noMidNGrams : true
        let maxNGramLengV = options.maxNGramLeng !== undefined ? options.maxNGramLeng : 6
        let usePrevV = options.usePrev !== undefined ? options.usePrev : true
        let useNextV = options.useNext !== undefined ? options.useNext : true
        let useDisjunctiveV = options.useDisjunctive !== undefined ? options.useDisjunctive : true
        let useSequencesV = options.useSequences !== undefined ? options.useSequences : true
        let usePrevSequencesV = options.usePrevSequences !== undefined ? options.usePrevSequences : true
        let useTypeSeqsV = options.useTypeSeqs !== undefined ? options.useTypeSeqs : true
        let useTypeSeqs2V = options.useTypeSeqs2 !== undefined ? options.useTypeSeqs2 : true
        let useTypeySequencesV = options.useTypeySequences !== undefined ? options.useTypeySequences : true
        let wordShapeV = options.wordShape !== undefined ? options.wordShape : 'chris2useLC'

        this.maxLeft = maxLeftV
        this.useClassFeature = useClassFeatureV
        this.useWord = useWordV
        this.useNGrams = useNGramsV
        this.noMidNGrams = noMidNGramsV
        this.maxNGramLeng = maxNGramLengV
        this.usePrev = usePrevV
        this.useNext = useNextV
        this.useDisjunctive = useDisjunctiveV
        this.useSequences = useSequencesV
        this.usePrevSequences = usePrevSequencesV
        this.useTypeSeqs = useTypeSeqsV
        this.useTypeSeqs2 = useTypeSeqs2V
        this.useTypeySequences = useTypeySequencesV
        this.wordShape = wordShapeV
        this.trainFileName = trainFileName
        this.modelName = modelName
        this.propPath = path.join(__dirname, './ner/classifiers/build.prop')
        this.nerPath = path.join(__dirname, './ner/stanford-ner.jar')
    }
}

module.exports = {
    Classifier,
    Server
}
