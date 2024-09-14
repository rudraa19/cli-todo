import { Command } from 'commander';
import fs from 'fs'
import chalk from 'chalk';

const program = new Command();

let data;
try {
    const fileContent = fs.readFileSync('./data.json', 'utf-8');
    data = JSON.parse(fileContent);
} catch (err) {
    console.error("Error reading file:", err);
}

const saveIntoFile = () => {
    const content = JSON.stringify(data, null, 4);
    fs.writeFile('./data.json', content, (err, res) => {
        if(err) {
            console.log("ERR IN SAVING FILE", err);
        }
    })
}

program
    .name("CLI-TODO")
    .description("CLI based todo app")
    .version("1.0.0")

program.command('show')
    .description("Shows all the tasks")
    .action(() => {
        console.log();
        data.tasks.forEach(e => {
            if (e.isComplete === true) {
                console.log(chalk.green(`${e.id + 1}. ${e.task}`));
            } else {
                console.log(chalk.red(`${e.id + 1}. ${e.task}`))
            }
        });
    })

program.command("add")
    .description("Add new task")
    .argument("<string>", "Task you want to add")
    .action((nameOfTask) => {
        const dataToEnter = {
            "id": data.tasks.length,
            "task": nameOfTask,
            "isComplete": false
        }
        data.tasks.push(dataToEnter)
        saveIntoFile();
    })

program.command("complete")
    .description("Mark task as complete")
    .argument('<int>', "Index of task you want to mark as complete")
    .action((index)=>{
        data.tasks.forEach(e => {
            if (e.id === index-1) {
                e.isComplete = true
            }
        });
        saveIntoFile();
    })

program.command("incomplete")
    .description("Mark task as incomplete")
    .argument('<int>', "Index of task you want to mark as incomplete")
    .action((index)=>{
        data.tasks.forEach(e => {
            if (e.id === index-1) {
                e.isComplete = false
            }
        });
        saveIntoFile();
    })

program.command("clear")
    .description("Delete the completed tasks")
    .action(() => {
        let counter = 0
        data.tasks = data.tasks.filter(e => e.isComplete !== true)
        data.tasks.forEach(e => {
            e.id = counter;
            counter++;
        })
        saveIntoFile();
    })

program.command("delete")
    .description("Deletes the entiere TODO list")
    .action(() => {
        data.tasks.length = 0;
        saveIntoFile();
    })

program.parse();


/**
 * show -
 * add -
 * complete - 
 * clear - 
 * delete
 * save - 
 */