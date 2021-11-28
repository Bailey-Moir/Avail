import { Message } from "discord.js";

import Logs from "../../logs";
import Command from "../../types/command";

import config from '../../../config.json';

let jokes = [
    'What is blue and smells like red paint? \nBlue paint.',
    'I was wondering why the ball was getting bigger. \nThen it hit me.',
    'What do you call someone with no body and no nose? \nNobody knows.',
    'Why couldn\'t the bicycle stand up by itself \nIt was two tired.',
    `Why can't a nose be 12 inches long? \nBecause then it would be a foot.`,
    `Today, my son asked "Can I have a book mark?" and I burst into tears. \n11 years old and he still doesn't know my name is Brian.`,
    `My roommate is really mad at the fact that I have no sense of direction. \nSo I packed up my stuff and right.`,
    `The secret service isn't allowed to yell "Get down!" anymore when the president is about to be attacked \nNow they have to yell "Donald, duck!"`,
    `I'm reading a book about anti-gravity. \nIt's impossible to put down!`,
    `What is the least spoken language in the world? \nSign language.`,
    `A slice of apple pie is $2.50 in Jamaica and $3.00 in the Bahamas \nThese are the pie rates of the Caribbean.`,
    `Why did the duck get arrested? \nHe was caught selling quack!`,
    `You.`
];

const command: Command = {
    callback: (message: Message, args: Array<string>) => 
        message.channel.send(jokes[Math.floor(Math.random() * jokes.length)])
            .catch(Logs.catcher),
    name: "Joke",
    description: "Tells you a joke.",
    example: `${config.prefix}joke`
}

module.exports = command;