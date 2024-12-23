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
async function insertNewUser(email, hashedPassword, gender, coins, currColor, currSound) {
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        gender,
        coins,
        currColor,
        currSound,
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
    if (!email) {
      console.error("User ID is null or undefined");
      return [];
  }
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

async function insertNewFlower(email, color, questionOne, questionTwo,questionThree,questionFour,questionFive, questionSix, x, y, questionSeven, dateCreated, done, isChecked) {
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
        isChecked: isChecked,
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
  done, isChecked) {

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
      done: done,
      isChecked: isChecked
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

async function updateFlowerChecked(currId, checked) {
    const updateFlower = await prisma.flower.update({
      where: {
        id: currId
      },
      data: {
          isChecked: checked,
      }
    });

  return updateFlower

}

async function updateFlowerQuestionSeven(id, questionSeven) {
  const updateFlower = await prisma.flower.update({
    where: {
      id: id
    },
    data: {
      questionSeven: questionSeven
    }
  })
  return updateFlower
}


async function getAllPositions(req, res) {
  const pos = await prisma.flower.findMany({
    select: {
      x: true,
      y: true
    }
  });
  return pos;
}

async function getSearchQuery(email, query) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  const results = await prisma.journal.findMany({
    where: {
      authorId: user.id,
      OR: [
        { mood: { contains: query, mode: 'insensitive' } },
        { title: { contains: query, mode: 'insensitive' } },
      ],
    },
  });

  return results

}

//User
async function getUser(email) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });
  return user;

}

async function deleteUserAccount(id) {
  const deleteUser = await prisma.user.delete({
    where: {
      id: id
    },
  })

  return deleteUser;
}



async function updateCoin(coins, email) {
  const user = await prisma.user.update({
    where: { email: email
    },
    data: {
      coins: coins
    }
  });

  return user;


}


//Sounds
async function getAllSounds(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  const sounds = await prisma.sounds.findMany({
    where: {
      authorId: user.id,
    }
  })
  return sounds;

}

async function insertNewSound(email, name, src) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  const newSound = await prisma.sounds.create({
    data: {
      name,
      src,
      author: {
        connect: { id: user.id }
      }
    }
  });
}

async function getSound(id) {
  const selectedSound = await prisma.sounds.findUnique({
    where: { id: id }
  });

  return selectedSound;

}

async function updateSound(sound, email) {
  const user = await prisma.user.update({
    where: { email: email
    },
    data: {
      currSound: sound
    }
  });

  return user;


}


//Colors
async function getAllColors(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  const colors = await prisma.colorSchemes.findMany({
    where: {
      authorId: user.id,
    }
  })
  return colors;

}

async function insertNewColor(email, name, dark, semiDark, medium, light, lightest) {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  const newColor = await prisma.colorSchemes.create({
    data: {
      name,
      dark,
      semiDark,
      medium,
      light,
      lightest,
      author: {
        connect: { id: user.id }
      }
    }
  });
}



async function deleteColor( id ) {
  const deleteColor = await prisma.colorSchemes.delete({
  where: {
    id: id
  },
})

return deleteColor;
}


async function updateColor(color, email) {
  const user = await prisma.user.update({
    where: { email: email
    },
    data: {
      currColor: color
    }
  });

  return user;


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
    updateFlowerColor,
    getSearchQuery,
    getUser,
    deleteUserAccount,
    updateCoin,
    updateFlowerChecked,
    updateFlowerQuestionSeven,

    getAllSounds,
    insertNewSound,
    getSound,
    updateSound,

    getAllColors,
    insertNewColor,
    deleteColor,
    updateColor


    // other database functions
  };
