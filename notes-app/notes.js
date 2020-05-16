const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const dupNotes = notes.find(note => note.title === title);
    if(!dupNotes){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Title Added'));
    }else{
        console.log(chalk.red.inverse('Title Taken'));
    } 
}

const removeNote = (title) => {
    const notes = loadNotes();
    const removedNotes = notes.filter(note => note.title !== title);
    if(notes.length === removedNotes.length)
        console.log(chalk.red.inverse('Title not found!'));
    else{
        saveNotes(removedNotes);
        console.log(chalk.green.inverse('Title removed'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.blue('Title : ' + note.title));
    });
} 

const readNote = (title) => {
    const notes = loadNotes();
    const rNote = notes.find(note => note.title === title);
    if(!rNote){
        console.log(chalk.red.inverse('Note not found'));
    }else{
        console.log(chalk.green.inverse('Titile : ' + rNote.title) + ' Body : ' + rNote.body);
    }
} 

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};