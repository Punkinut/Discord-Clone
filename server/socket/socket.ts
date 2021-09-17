import { User } from '../models';

const rootSocket = (io: any) => {
let users:any = [];

const removeUser = (socketId:any) => {
  users = users.filter((user:any) => user.socketId !== socketId);
};

const getSocketUser = (internalSocket:any) => {
  return users.find((user:any) => user.socketId === internalSocket)
};

io.on("connection", (socket:any) => {
  io.emit('Welcome', 'Socket server is working!')

  // Connection to socket
  socket.on('login', (data:any) => {
    console.log(data.userId + ' connected');
    users.push({
      socketId: socket.id, 
      userId: data.userId,
      username: data.username
    })
  });

  socket.on("sendRequest", async ({ username }:any) => {
    const user  = await User.findOne({ username })
    const thisId = await getSocketUser(socket.id)?.userId;
    const newUser = await users.find((user:any) => user?.username === username);
    const userSend = await newUser?.socketId;

    if (userSend) {
      try {
        io.to(userSend).emit("getRequest", {
          id: thisId
        });
        console.log('User is online and the request was sent.')
      } catch (err) {
        console.log(err)
      }
    } else {
       await User.findOneAndUpdate({ _id: user._id }, { $addToSet: {friends: { user: thisId, status: 2 }} }, {new: true});
       console.log('The user is not online the request was not sent.')
    }
  });

  socket.on('sendAccept', async ({ id }:any) => {
    const user  = await User.findOne({ _id: id })
    const newUser = await users.find((user:any) => user?.userId === id);
    const thisId = await getSocketUser(socket.id)?.userId;
    const userSend = await newUser?.socketId;
    if (userSend) {
      try {
        io.to(userSend).emit('getAccept', {
          id: thisId
        });
      } catch (err) {
        console.log(err)
      }
    } else {
      await User.findOneAndUpdate({ _id: user._id, friends: {$elemMatch: {user: thisId}}}, {$set: {'friends.$.status': 3}},{new: true});
    }
  })

  // Disconnecting from socket
  socket.on('disconnect', async () => {
    const thisId = getSocketUser(socket.id)?.userId;
    if (thisId) {
          console.log(thisId + ' disconnected');
    try {
      const user = await User.findOne({ _id: thisId });
      if (user?.status === 'online') {
        await User.findOneAndUpdate({ _id: thisId}, { status: 'realOffline' }, {new: true})
      }
    } catch (err) {
      console.log(err)
    }
    removeUser(socket.id);
    }
  });
});
};

export default rootSocket