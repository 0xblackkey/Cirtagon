const messages = [
    { text: "> Wake up, Seeker...", duration: 2000 }, 
    { text: "> Cirtagon has already found you...", duration: 2000 }, 
    { text: "> Follow the Enter ↵ key, and see how deep the rabbit hole goes.", duration: null }, 
    { text: "> Knock, knock, Seeker...<br>> ARE YOU SURE YOU WANT TO CONTINUE? (y/n)", duration: null }, 
    { text: "> Opening the terminal...<br>> Welcome to the Cirtagon Realm, where the curious become rich", duration: 750 }, 
    { text: "> Oh... It seems you’ve already chosen your path.<br>> But some paths are inevitable...<br>> Reawakening the terminal...<br>> Reopening Cirtagon...", duration: 750 } 
];
let index = 0;
const typingSpeed = 75;
const typingMessage = document.getElementById('liner');
const redirectPath = "./127.0.0.1_8081/dl/Terminal.html"; 
function typeMessage(message, callback) {
    typingMessage.innerHTML = ""; 
    let charIndex = 0;
    document.removeEventListener('keydown', handleKeyPress);
    function typeNextChar() {
        if (charIndex < message.length) {
            if (message.substring(charIndex, charIndex + 4) === "<br>") {
                typingMessage.innerHTML += "<br>"; 
                charIndex += 4; 
            } else {
                typingMessage.innerHTML += message.charAt(charIndex);
                charIndex++;
            }
            setTimeout(typeNextChar, typingSpeed);
        } else {          
            document.addEventListener('keydown', handleKeyPress);
            if (callback) callback();
        }
    }
    typeNextChar();
}
function displayMessages() {
    if (index < messages.length) {
        typeMessage(messages[index].text, () => {
            if (messages[index].duration) {
                setTimeout(() => {
                    typingMessage.innerHTML = ""; 
                    if (index === 4) {
                        setTimeout(() => {
                            window.location.href = redirectPath;
                        }, messages[index].duration);
                        return;
                    } else if (index === 5) {
                        setTimeout(() => {
                            window.location.href = redirectPath;
                        }, messages[index].duration);
                        return;
                    }
                    index++;
                    displayMessages();
                }, messages[index].duration);
            } else {
                waitForKeyPress();
            }
        });
    }
}
function waitForKeyPress() {
    let userChoice = "";
    document.addEventListener('keydown', handleKeyPress);
}
function handleKeyPress(e) {
    if (index === 2) {
        if (e.key === 'Enter') {
            index++;
            displayMessages();
        }
    } else if (index === 3) { 
        if (e.key === 'y' || e.key === 'n') {
            userChoice = e.key;
            typingMessage.innerHTML = `> Knock, knock, Seeker...<br>> ARE YOU SURE YOU WANT TO CONTINUE? (y/n) ${userChoice}`; 
        }
        if (e.key === 'Enter') {
            if (userChoice === 'y') {
                index++;
            } else if (userChoice === 'n') {
                index += 2; 
            }
            displayMessages();
        }
    }
}
displayMessages();