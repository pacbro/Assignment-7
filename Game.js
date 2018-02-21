var desc = "";
let visits = 0;
var locations = {
	outside: {
		name: "Outside the haunted mansion",
		on_enter: function()
		{
			desc = "You've heard rumors about this place.<br> A haunted mansion, its eerie facade gleaming in the moonlight, on the outskirts of land no sane person would live in. <br> On a dare from a friend, you find yourself here to explore it.";
		},
		commands: Go["north", "foyer"]
	},
	foyer: {
		onEnter: [
			function()
			{
				if (visits == 0)
				{
					// first time in this room
					desc = "The door slams shut behind you, with a loud crash. You pull on it, but it does not budge.";
					visits++;
				} else
				{
					desc = "You stand in the foyer, puzzling at what to do next. The smell of dust and mildew tickle your nostrils.";

				}
			}
		],
		commands: [Go("north", "hallway"), Go("west", "darkroom"),
		Cmd(function()
		{
			if (!objects.broken_wall.broken)
			{
				desc = "<br> You look around. The floor is littered with debris. A decrepit staircase sits across from the entrance. On the one wall towers a heavy wooden door, barely hanging on it's hinges.<br> The other wall is barely standing, thinning wallpaper dotted with large holes.";
			} else
			{
				desc = "<br> You look around. The floor is littered with debris. A decrepit staircase sits across from the entrance. On the one wall towers a heavy wooden door, barely hanging on it's hinges.<br> The other wall sports a huge hole where you broke it down.";
			}
		}, ["look", "look around"]),
		Cmd(function()
		{
			if (in_array(inventory, "hammmer") && broken_wall.examine)
			{
				// Break wall to enter secret room
				desc = "<br> You smash through the wall with your trusty sledgehammer. The sounds of the destruction echo through the room. ";
				objects.broken_wall.broken = true;
			}
		}, ["use hammer"]),
		],
			objects: ["broken_wall"]
	},

	darkroom: {
		onEnter: [
			function()
			{
				if (!objects.lantern.used)
				{
					// lantern not used
					desc = "The room is pitch black. There are no windows in this room, and you find yourself tripping trying to navigate your way into it.";
				} else
				{
					desc = "The lantern illuminates the the cluttered piles of books, casting shadows on the wall.";
				}
			}
		],
		commands: [
			Go("south", "foyer"),
			Cmd(function()
			{
				//check to see if there is light
				if (!objects.lantern.used)
				{
					// lantern not used
					desc = "You can't see anything in the darkness.";
				}
				else
				{
					//lantern used
					desc = "A messy room surrounds you. Old books piled on the floor, and bookshelves line the walls. In the corner of the room lies a sledgehammer, propped up against a wall.";
				}
			}, ["look", "look around"]),
			Cmd(function()
			{
				if (in_array(inventory, "lantern"))
				{
					desc = "As you hit the switch, the lantern slowly flickers on, illuminating the room. You decide to leave it here just in case.";
					objects.lantern.used = true;
				}
			}, ["use lantern"]),
		],
		objects: ["hammer"]
	},

	secretroom: {
		desc: "A very tidy room, oddly, except for the debris from your entrance. A mahogany desk lines one wall, various papers in some odd tongue you can't read scattered across it, with a key seemingly being used as a paperweight.",
		commands: [
			Go("east", "foyer"),
			Cmd(function()
			{
				desc = "At closer inspection it looks like someone was interrupted during work, and never got back to it. A fine layer of dust lies over the desk.";
			}, ["look", "look around"]),
		],
		objects: ["key"]
	}//,

	//hallway: {
	//	desc: "A long hallway lies before you, with a door on each wall at the end of it. Both doors seem to be firmly closed.",
	//	commands: [
	//		Go("south", "foyer"),
	//		Cmd(function()
	//		{
	//			desc = "You try both doors, and find that they are locked. It looks like they both take the same key.";
	//		}, ["look", "look around"]),
	//		Cmd(function()
	//		{
	//			if (in_array(inventory, "key"))
	//			{
	//				desc = "You decide to use the key.. but on which door? Right or left?";
	//				//	function()
	//				//	{
	//				//		youwin();
	//				//	}, ["right", "open right door", "open right"],
	//				//function()
	//				//{
	//				//	youlose();
	//				//}, ["left", "open left door", "open left"]
	//			}, ["open door"]),
	//	],
	//	objects: ["lantern"]
	//}
};



var objects = {
	broken_wall: {
		name: "a broken down wall in the foyer of the mansion",
		examined: false, //seen by look
		broken: false, //broken by hammer
		commands: [
			Cmd(function()
			{
				msg = "<br> The broken wall looks like it could be smashed through...";
				examined = true;
			}, ["look at wall", "look at broken wall", "look wall", "look broken wall", "examine broken wall", "examine wall"]
			)]
	},

	lantern: {
		name: "a small and beaten up electric lantern.",
		used: false, //changes in darkroom
		taken: false,
		commands: [
			Cmd(function()
			{
				msg = "<br> A small and beaten up electric lantern. Potentially left here by another explorer, or the previous residents. Somehow it still works."
			}, ["look at lantern", "look lantern", "examine lantern"]),
			Cmd(function()
			{
				if (!objects.lantern.taken)
				{
					msg = "<br> You took the lantern.";
					taken = true;
				} else
				{
					msg = "<br> You have already taken the lantern."
				}
			}, ["take lantern"])

		]
	},
	hammer: {
		name: "A long handled sledgehammer. A bit dusty but very intact.",
		taken: false,
		used: false, //changes in darkroom
		commands: [
			Cmd(function()
			{
				msg = "<br> A heavy, long handled sledgehammer. It looks like it could do some damage.";
			}, ["look at hammer", "look hammer", "examine hammer"]),
			Cmd(function()
			{
				if (!objects.hammer.taken)
				{
					msg = "<br> You took the hammer.";
					taken = true;
				} else
				{
					msg = "<br> You have already taken the hammer."
				}
			}, ["take hammer", "take slegehammer"])
		]
	},

	key: {
		name: "A rusty old key.",
		used: false, //changes in hallway, win/lose condition
		commands: [
			Cmd(function()
			{
				msg = "<br> A rusty old key... Looks like it definitely unlocks something in the house."
			}, ["look at key", "look key", "examine key"]),
			Cmd(function()
			{
				if (!objects.key.taken)
				{
					msg = "<br> You took the key.";
					taken = true;
				} else
				{
					msg = "<br> You have already taken the key."
				}
			}, ["take key"])
		]
	}
};
function go(direct,key,condition)
{
      	var mapping = {
		east:"left",
		west:"right",
        north: "up",
        south: "down"
	};
    
	var commands = ["go "+direct , direct];
	if(direct in mapping)
		commands = commands.concat(["go "+mapping[direct]]);
	var go = Cmd(function() { go_to (key); }, commands,condition); return go;      
}

function youwin()
{
	alert("Not implemented yet.");
}

function youlose()
{
	alert("Not implemented yet.");
}
