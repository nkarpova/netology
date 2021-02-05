// TASK 2
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let number = Math.floor(Math.random() * 100);

  rl.question('Загадано число в диапазоне от 0 до 100 \n', (answer) => {
    if (answer == number){
        rl.close();
    }

    else if (answer < number){
        rl.setPrompt("Больше, попробуйте еще раз \n");
        rl.prompt();
        rl.on('line',(answer) =>{
            if (answer == number)
            rl.close();
            else if (answer > number){
                rl.setPrompt("меньше, попробуйте еще раз \n");
                rl.prompt();
            }
            else if (answer < number){
              rl.setPrompt("больше, попробуйте еще раз \n");
              rl.prompt();
          }
        })
    }
    else if (answer > number){
      rl.setPrompt("Меньше, попробуйте еще раз \n");
      rl.prompt();
      rl.on('line',(answer) =>{
          if (answer == number)
          rl.close();
          else if (answer < number){
              rl.setPrompt("больше, попробуйте еще раз \n");
              rl.prompt();
          }
          else if (answer > number){
            rl.setPrompt("меньше, попробуйте еще раз \n");
            rl.prompt();
        }
      })
  }
    
});
  rl.on('close', () =>{
    console.log(`Вы угадали!Это число: ${number}`);
  });