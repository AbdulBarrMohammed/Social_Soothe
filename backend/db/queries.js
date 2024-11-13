const { PrismaClient } = require("@prisma/client");
const { emit } = require("process");
const prisma = new PrismaClient()

async function getAllJournals(email) {
    return prisma.journal.findMany({
      where: {
          author: {
              email: email, // Filtering journals by the author's email
          },
      },
      include: {
          author: true, // Optional: Include author details in the result
      },
  });

}




// USERS
async function insertNewUser(email, hashedPassword, gender) {
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        gender,
      },
  });


}

async function getUser(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}


async function displayJournals(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    const journals = await prisma.journal.findMany({
      where: {
        authorId: user.id,
      }
    })
    return journals;

}

async function insertNewJournal(email, title, content, mood, dateCreated) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  const newJournal = await prisma.journal.create({
    data: {
      title,
      content,
      mood,
      dateCreated: dateCreated,
      author: {
        connect: { id: user.id } // Link the journal to the user (author)
      }
    }
  });


}


async function getJournal(id) {
  const selectedJournal = await prisma.journal.findUnique({
    where: { id: id }
  });

  return selectedJournal;

}

async function deleteJournal( id ) {
  const deleteJournal = await prisma.journal.delete({
   where: {
     id: id
   },
 })

 return deleteJournal;
 }


 async function updateJournal(id, title, content) {

    const updateJournal = await prisma.journal.update({
      where: {
        id: id
      },
      data: {
        title: title,
        content: content
      }
    });

    return updateJournal


}


async function getAllFlowers(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  const flowers = await prisma.flower.findMany({
    where: {
      authorId: user.id,
    }
  })
  return flowers;

}

async function insertNewFlower(email, color, questionOne, questionTwo,questionThree,questionFour,questionFive, questionSix, x, y, questionSeven, dateCreated, done) {
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    const newFlower = await prisma.flower.create({
      data: {
        color,
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        questionFive,
        questionSix,
        x,
        y,
        questionSeven,
        dateCreated: dateCreated,
        done: done,
        author: {
          connect: { id: user.id }
        }
      }

  });
}





async function getFlower(id) {
  const selectedFlower = await prisma.flower.findUnique({
    where: { id: id }
  });

  return selectedFlower;

}

async function deleteFlower( id ) {
  const deleteFlower = await prisma.flower.delete({
  where: {
    id: id
  },
})

return deleteFlower;
}


async function updateFlower(id, color, questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive,
  questionSix,
  questionSeven,
  done) {

  const updateFlower = await prisma.flower.update({
    where: {
      id: id
    },
    data: {
      color: color,
      questionOne: questionOne,
      questionTwo: questionTwo,
      questionThree: questionThree,
      questionFour: questionFour,
      questionFive: questionFive,
      questionSix: questionSix,
      questionSeven: questionSeven,
      done: done
    }
  });

  return updateFlower


}

async function updateFlowerColor(currId, color, done) {
  const updateFlower = await prisma.flower.update({
    where: {
      id: currId
    },
    data: {
        color: color,
        done: done
    }
  });

  return updateFlower

}


async function getAllPositions(req, res) {
  const pos = await prisma.flower.findMany({
    select: {
      x: true,
      y: true
    }
  });
  //return res.json(pos);
  return pos;
}



module.exports = {
    getAllJournals,
    insertNewUser,
    getUser,
    displayJournals,
    insertNewJournal,
    getJournal,
    deleteJournal,
    updateJournal,
    insertNewFlower,
    getFlower,
    deleteFlower,
    updateFlower,
    getAllFlowers,
    getAllPositions,
    updateFlowerColor

    // other database functions
  };
