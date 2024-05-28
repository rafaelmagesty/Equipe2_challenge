// retorna um número inteiro aleatório entre "min" e "max"
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// retorna true se ao menos uma letra de "target" está presente em "list" (usada para determinar a força da senha)
function has(target, list){
    for(var i=0; i<list.length; i++){
        for(var ii=0; ii<target.length; ii++){
            if(target[ii]==list[i]) return true;
        }
    }
    return false;
}   


/**
 * 
 * @param {number} target_size 
 * @param {boolean} uppercase 
 * @param {boolean} lowercase 
 * @param {boolean} numbers 
 * @param {boolean} symbols 
 * @returns {string}
 */
// retorna a senha com "target_size" caracteres de acordo com os tipos de caracteres selecionados
function generate(target_size, uppercase=false, lowercase=false, numbers=false, symbols=false){
    const lowerlist = "abcdefghijklmnopqrstuvwxyz";
    const upperlist = lowerlist.toUpperCase();
    const numberlist = "1234567890";
    const symbollist = '!"#$%&\'()*+,-./:;<=>?@[\\]^_{|}~';

    var choice_list = "";
    if(uppercase) choice_list+=upperlist;
    if(lowercase) choice_list+=lowerlist;
    if(numbers) choice_list+=numberlist;
    if(symbols) choice_list+=symbollist;

    var password = "";
    for(var i=0; i<target_size; i++){
        password+=choice_list[getRandomInt(0, choice_list.length-1)];
    }
    return password;
}


/**
 * 
 * @param {string} password 
 * @returns {number}
 */
// retorna uma força da senha entre 0 e 4 (o valor é arredondado para cima)
function password_strength(password){
    const lowerlist = "abcdefghijklmnopqrstuvwxyz";
    const upperlist = lowerlist.toUpperCase();
    const numberlist = "1234567890";
    const symbollist = '!"#$%&\'()*+,-./:;<=>?@[\\]^_{|}~';

    var score = 0;
    if(password.length>=5) score+=1;
    if(has(password, lowerlist) && has(password, upperlist)) score+=1;
    if(has(password, numberlist) && has(password, symbollist)) score+=1;
    if(has(password, numberlist)) score+=0.5;
    if(has(password, symbollist)) score+=0.5;

    return Math.ceil(score);
}