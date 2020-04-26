const fs = require('fs-extra')
const shell = require('shelljs')
const path = require('path')

module.exports = class classifier {
    /**
     *
     */
    train() {
        if (this.trainFileName === undefined || this.trainFileName === null) {
            console.log('Please give a train file name')
            return -1
        }
        let shellCommand = `java -cp ${this.nerPath} edu.stanford.nlp.ie.crf.CRFClassifier -prop ${this.propPath}`
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
        this.propPath = path.join(__dirname, '../ner/classifiers/build.prop')
        this.nerPath = path.join(__dirname, '../ner/stanford-ner.jar')
    }
}
