const commander = require('commander');
const program = commander.program;

// program
//     .version('1.0.0')
//     .description('机器人指令')
//     .option('-t | --test-aa <v>', '测试', '123')
//     .option('-n | --名字 <v>')

// console.log(program.opts());

program
    .version('0.1.0')
    .command('install [name]', 'install one or more packages')
//     // .command('search [query]', 'search with optional query')
//     .command('list')
//     .option('-u | --uu')
//     .action((op) => {
//         console.log(op);
//     })


// program
//     .command('install [name]')
//     .option('-tt | --qweqwe', 'edrfwer')
//     .action((name, option, command) => {
//         console.log(name, option);
//         // console.log(command);
//     })

// console.log(process.argv);

program.parse(['-f', 'filename'], { from: 'user' });
// console.log(program.opts());