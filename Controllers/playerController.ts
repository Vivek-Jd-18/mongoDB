import Player from "../Models/Players";

// get all players
const getPlayers = async (req: any, res: any) => {
  try {
    if (req.query.page && req.query.limit) {
      const players = await Player.paginate(
        {},
        { page: req.query.page, limit: req.query.limit },
      );
      res.status(200).json(players);
    } else {
      const players = await Player.find();
      res.status(200).json(players);
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// get a single player
const getPlayer = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const player = await Player.findById(id);
    res.status(200).json(player);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// create a player
const createPlayer = async (req: any, res: any) => {
  let _player = new Player({
    name: req.body.name,
    primaryPosition: req.body.primaryPosition,
    positions: req.body.positions,
    club: req.body.club,
    jerseyNumber: req.body.jerseyNumber,
    nationality: req.body.nationality,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    matchesPlayed: req.body.matchesPlayed,
    goalsScored: req.body.goalsScored,
    assists: req.body.assists,
    yellowCards: req.body.yellowCards,
    redCards: req.body.redCards,
    rating: req.body.rating,
    description: req.body.description,
  });
  if (req.file) {
    _player.image = req.file.path;
  }
  const playerData = await _player.save();
  try {
    const newPlayer = await Player.create(playerData);
    res.status(201).json({ message: "Player created!", data: newPlayer });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// update a player
const updatePlayer = async (req: any, res: any) => {
  const { id } = req.params;
  console.log(id, "id");
  let _player = {
    name: req.body.name,
    primaryPosition: req.body.position,
    positions: req.body.positions,
    club: req.body.club,
    jerseyNumber: req.body.jerseyNumber,
    nationality: req.body.nationality,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    matchesPlayed: req.body.matchesPlayed,
    goalsScored: req.body.goalsScored,
    assists: req.body.assists,
    yellowCards: req.body.yellowCards,
    redCards: req.body.redCards,
    rating: req.body.rating,
    image: req.body.image,
    description: req.body.description,
  };
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(id, _player, {
      useFindAndModify: false,
    });
    res
      .status(200)
      .json({ message: "Player updated successfully", data: updatedPlayer });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// delete a player
const deletePlayer = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await Player.findByIdAndDelete(id);
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const multiUpload = async (req: any, res: any) => {
  if (req.files) {
    console.log(req.files);
  }
  // let _player = new Player({
  //   name: req.body.name,
  //   primaryPosition: req.body.primaryPosition,
  //   positions: req.body.positions,
  //   club: req.body.club,
  //   jerseyNumber: req.body.jerseyNumber,
  //   nationality: req.body.nationality,
  //   age: req.body.age,
  //   height: req.body.height,
  //   weight: req.body.weight,
  //   matchesPlayed: req.body.matchesPlayed,
  //   goalsScored: req.body.goalsScored,
  //   assists: req.body.assists,
  //   yellowCards: req.body.yellowCards,
  //   redCards: req.body.redCards,
  //   rating: req.body.rating,
  //   description: req.body.description,
  // });
  // if (req.file) {
  //   _player.image = req.file.path;
  // }
  // const playerData = await _player.save();
  try {
    //   const newPlayer = await Player.create(playerData);
    res.status(201).json({ message: "Player created!", data: "newPlayer" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  multiUpload,
};
