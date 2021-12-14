/**
 * Command that tells the user a dead baby joke.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message } from "discord.js";

import Command, { CommandCatergory } from "../types/command";

import config from '../../config.json';

let jokes = [
    `How do you stop a baby from crawling around in circles? \nNail it’s other hand to the floor.`,
    `What is the difference between a baby and an onion? \nYou don't cry when you chop up the baby.`,
    `What do you call a dead baby pinned to your wall? \nArt.`,
    `What is red and hangs around trees? \nbaby hit by a snow blower. \n\nWhat is green and hangs around trees? \nSame baby 3 weeks later.`,
    `What do you call a dead baby with no arms and no legs in the middle of the ocean? \nFucked.`,
    `What is red and goes round and round? \nA baby in a garbage disposal.`,
    `What’s the difference between a baby and a pizza? \nA pizza doesn’t scream when you put it in the oven.`,
    `What is cold, blue and doesn’t move? \nThe baby in the freezer.`,
    `What’s got four wheels, smokes and squeals? \nA bus load of babies on fire.`,
    `What is more fun than throwing a baby off a cliff? \nCatching it with a pitchfork.`,
    `What’s the difference between a soccer ball and a baby? \nI’ve never kicked a soccer ball over 50 yards.`,
    `What do babies and baseballs have in common? \nThe neighbor gets angry when you throw them through their window.`,
    `What’s the difference between a dead baby and a peanut butter cup? \nThe dead baby won’t stick to the roof of your mouth.`,
    `What’s the difference between 100 dead babies and a Ferrari? \nI don’t keep a Ferrari in my garage.`,
    `What is grosser than ten dead babies nailed to a tree? \nOne dead baby nailed to ten trees.`,
    `What's the best thing about dead baby jokes? They never get old`,
    `What's Brown and taps on the window.\nA baby in a microwave.`,
    `What's purple and kicks?\nA baby suffocating in a plastic bag.`,
    `How do you get 100 babies into a bucket?\n With a blender.\n\nHow do you get them out again?\nWith Doritos.`,
    `What is funnier than a dead baby?\nA dead baby in a clown costume.`,
    `What do you call a dead baby pinned to your wall?\nArt.`,
    `What bounces up and down at 100mph?\nA baby tied to the back of a truck.`,
    `What is brown and gurgles?\nA baby in a casserole.`,
    `What do vegetarian ogres eat?\nCabbage patch kids.`,
    `What do you call a baby on a stick?\nA Kebabie.`,
    `What do you get when you have sex with a pregnant woman?\nA baby with a black eye.`,
    `What is blue and sits in the corner?\nA baby in a baggie.`,
    `What is black and sits in a corner?\nA baby with it’s finger in a power socket.`,
    `What gets louder as it gets smaller?\nA baby in a trash compactor.`,
    `What is more disgusting than a pile of 100 dead babies?\nOne live one in the middle is eating its way out.`,
    `What sits in the kitchen and keeps getting smaller and smaller?\nA baby combing it’s hair with a potato peeler.`,
    `What is the difference between a carrot and a dead baby?\nCarrots don’t scream when you skin them`,
    `What do you call a baby on a pike?\nA lollipop.`,
    `What is pink, flies and squeals?\nA baby fired from a catapult.`,
    `What do you call the baby when it lands?\nFree pizza.`,
    `What’s the difference between a baby and a bagel?\nYou can put a bagel in the toaster. You have to put the baby in the oven.`,
    `What’s the difference between a bucket of gravel and a bucket of baby guts?\nYou can’t gargle gravel.`,
    `What goes plop, plop, fizz, fizz?\nTwins in an acid bath.`,
    `What’s the difference between a dead baby and a felt tip marker?\nYou don’t get second looks when you’re writing with a felt tip marker.`,
    `What’s the difference between a dead baby and a peanut butter cup?\nThe dead baby won’t stick to the roof of your mouth.`,
    `What is red and pink and hanging out of your dog’s mouth?\nYour baby’s leg.`
];

const command: Command = {
    callback: (message: Message, args: string[]) => 
        message.channel.send(jokes[Math.floor(Math.random() * jokes.length)]),
    name: "Baby",
    catergory: CommandCatergory.FUN,
    description: "Tells you a dead baby joke.",
    example: `${config.prefix}baby`
}

module.exports = command;