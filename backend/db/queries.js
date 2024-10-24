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

module.exports = {
    getAllJournals,
    insertNewUser,
    getUser,
    displayJournals,
    insertNewJournal,
    getJournal

    // other database functions
  };
