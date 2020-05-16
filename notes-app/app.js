const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.0');

yargs.command({
    command : 'add',
    describe : 'Add a note',
    builder : {
        title : {
            describe : ' Note Title ',
            type : 'string',
            demandOption : true
        },
        body : {
            describe : 'Title Body',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argsv){
        notes.addNote(argsv.title, argsv.body);
    }
});

yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demandOption: true
        }
    },
    handler(argsv){
        notes.removeNote(argsv.title);
    }
});

yargs.command({
    command : 'list',
    describe : 'List a note',
    handler(){
        notes.listNotes();
    }
});

yargs.command({
    command : 'read',
    describe : 'Read a note',
    builder: {
        title: {
            describe: 'Note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argsv){
        notes.readNote(argsv.title);
    }
});

yargs.parse();