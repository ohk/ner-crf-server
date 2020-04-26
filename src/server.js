const { spawn, exec } = require('child_process')
const net = require('net')
const path = require('path')
const tsvParser = require('./tsvParser')
const terminate = require('terminate')
const sleep = require('sleep')

module.exports = class server {
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
            console.log(res.tags)

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
        let command = `java -mx1000m -cp "${this.nerPath}:${this.libPath}" edu.stanford.nlp.ie.NERServer  -loadClassifier ${this.classifier}.ser.gz -port ${this.port} -tokenizerFactory edu.stanford.nlp.process.WhitespaceTokenizer -tokenizerOptions tokenizeNLs=false -outputFormat tsv`
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
        this.nerPath = path.join(__dirname, '../ner/stanford-ner.jar')
        this.libPath = path.join(__dirname, '../ner/lib/*')
    }
}
