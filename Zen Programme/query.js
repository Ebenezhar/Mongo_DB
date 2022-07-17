//1.Find all the topics and tasks which are thought in the month of October
db.attendance.aggregate([
    {
      '$match': {
        'Date': {
          '$gt': new Date('Sun, 01 Aug 2021 00:00:00 GMT'), 
          '$lt': new Date('Wed, 01 Sep 2021 00:00:00 GMT')
        }
      }
    }, {
      '$lookup': {
        'from': 'tasks', 
        'localField': 'Task', 
        'foreignField': '_id', 
        'as': 'Task Data'
      }
    }, {
      '$unwind': {
        'path': '$Task Data'
      }
    }, {
      '$lookup': {
        'from': 'topics', 
        'localField': 'Topic', 
        'foreignField': '_id', 
        'as': 'Topic Data'
      }
    }, {
      '$unwind': {
        'path': '$Topic Data'
      }
    }, {
      '$project': {
        '_id': 1, 
        'Date': 1, 
        'Task Data': {
          '_id': 1, 
          'Name': 1, 
          'Date': 1
        }, 
        'Topic Data': {
          '_id': 1, 
          'Name': 1, 
          'Date': 1
        }
      }
    }
])

//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.comp_drives.aggregate([
  {
    '$match': {
      'Date': {
        '$gt': new Date('Sun, 15 Aug 2021 00:00:00 GMT'), 
        '$lt': new Date('Tue, 31 Aug 2021 00:00:00 GMT')
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'name': 1, 
      'Date': 1
    }
  }
])

//3.Find all the company drives and students who are appeared for the placement.

db.comp_drives.aggregate([
  {
    '$unwind': {
      'path': '$studentsAttended'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'studentsAttended', 
      'foreignField': '_id', 
      'as': 'StudentData'
    }
  }, {
    '$unwind': {
      'path': '$StudentData'
    }
  }, {
    '$group': {
      '_id': '$name', 
      'Students Appeared': {
        '$push': '$StudentData.Name'
      }
    }
  }
])


//4.Find the number of problems solved by the user in codekata
db.codekata.aggregate([
  {
    '$unwind': {
      'path': '$students-solved'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'students-solved', 
      'foreignField': '_id', 
      'as': 'Student_Details'
    }
  }, {
    '$unwind': {
      'path': '$Student_Details'
    }
  }, {
    '$group': {
      '_id': '$Student_Details.Name', 
      'Questions': {
        '$push': '$Question'
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'NumberOfQuesSolved': {
        '$size': '$Questions'
      }
    }
  }
])

//5.Find all the mentors with who has the mentee's count more than 5
db.mentors.aggregate([
  {
    '$project': {
      'name': 1, 
      'Number_of_students': {
        '$size': '$students-assigned'
      }
    }
  }, {
    '$match': {
      'Number_of_students': {
        '$gt': 5
      }
    }
  }
])


db.mentors.insertMany([
  {
      "name": "Mentor Name1",
      "contact": "12356",
      "age": 32,
      "mail-id": "asdf@gmail.com",
      "students-assigned": [
          ' ObjectId("62d2b9651e483becbeb51313")',
          ' ObjectId("62d2b9651e483becbeb51314")',
          ' ObjectId("62d2b9651e483becbeb51315")'
      ]
  },
  {
      "name": "Mentor Name2",
      "contact": "12648",
      "age": 35,
      "mail-id": "zxcv@gmail.com",
      "students-assigned": [
      'ObjectId("62d2b9651e483becbeb51317")',
      'ObjectId("62d2b9651e483becbeb51316")',
      'ObjectId("62d2b9651e483becbeb51318")',
      'ObjectId("62d2b9651e483becbeb51319")',
      'ObjectId("62d2b9651e483becbeb5131a")',
      'ObjectId("62d2b9651e483becbeb5131c")',
      'ObjectId("62d2b9651e483becbeb5131b")'
      ]
  },
  {
      "name": "Mentor Name3",
      "contact": "25896",
      "age": 36,
      "mail-id": "sdfg@gmail.com",
      "students-assigned": [
      'ObjectId("62d2b9651e483becbeb5131d")',
      'ObjectId("62d2b9651e483becbeb5131e")',
      'ObjectId("62d2b9651e483becbeb51320")',
      'ObjectId("62d2b9651e483becbeb51321")',
      'ObjectId("62d2b9651e483becbeb51322")',
      'ObjectId("62d2b9651e483becbeb51323")',
      'ObjectId("62d2b9651e483becbeb51324")',
      'ObjectId("62d2b9651e483becbeb51325")',
      'ObjectId("62d2b9651e483becbeb51326")'
      ]
  }
])
db.users.insertMany([
  {
  "Name": "Name 1",
  "Age": 40,
  "Contact": 21,
  "Mail-id": "Mail-id 1",
  "id": "1"
  },
  {
  "Name": "Name 2",
  "Age": 33,
  "Contact": 34,
  "Mail-id": "Mail-id 2",
  "id": "2"
  },
  {
  "Name": "Name 3",
  "Age": 40,
  "Contact": 85,
  "Mail-id": "Mail-id 3",
  "id": "3"
  },
  {
  "Name": "Name 4",
  "Age": 77,
  "Contact": 71,
  "Mail-id": "Mail-id 4",
  "id": "4"
  },
  {
  "Name": "Name 5",
  "Age": 34,
  "Contact": 7,
  "Mail-id": "Mail-id 5",
  "id": "5"
  },
  {
  "Name": "Name 6",
  "Age": 38,
  "Contact": 45,
  "Mail-id": "Mail-id 6",
  "id": "6"
  },
  {
  "Name": "Name 7",
  "Age": 47,
  "Contact": 94,
  "Mail-id": "Mail-id 7",
  "id": "7"
  },
  {
  "Name": "Name 8",
  "Age": 12,
  "Contact": 19,
  "Mail-id": "Mail-id 8",
  "id": "8"
  },
  {
  "Name": "Name 9",
  "Age": 69,
  "Contact": 42,
  "Mail-id": "Mail-id 9",
  "id": "9"
  },
  {
  "Name": "Name 10",
  "Age": 15,
  "Contact": 99,
  "Mail-id": "Mail-id 10",
  "id": "10"
  },
  {
  "Name": "Name 11",
  "Age": 83,
  "Contact": 35,
  "Mail-id": "Mail-id 11",
  "id": "11"
  },
  {
  "Name": "Name 12",
  "Age": 32,
  "Contact": 3,
  "Mail-id": "Mail-id 12",
  "id": "12"
  },
  {
  "Name": "Name 13",
  "Age": 18,
  "Contact": 76,
  "Mail-id": "Mail-id 13",
  "id": "13"
  },
  {
  "Name": "Name 14",
  "Age": 23,
  "Contact": 21,
  "Mail-id": "Mail-id 14",
  "id": "14"
  },
  {
  "Name": "Name 15",
  "Age": 59,
  "Contact": 3,
  "Mail-id": "Mail-id 15",
  "id": "15"
  },
  {
  "Name": "Name 16",
  "Age": 65,
  "Contact": 72,
  "Mail-id": "Mail-id 16",
  "id": "16"
  },
  {
  "Name": "Name 17",
  "Age": 35,
  "Contact": 51,
  "Mail-id": "Mail-id 17",
  "id": "17"
  },
  {
  "Name": "Name 18",
  "Age": 69,
  "Contact": 46,
  "Mail-id": "Mail-id 18",
  "id": "18"
  },
  {
  "Name": "Name 19",
  "Age": 55,
  "Contact": 61,
  "Mail-id": "Mail-id 19",
  "id": "19"
  },
  {
  "Name": "Name 20",
  "Age": 67,
  "Contact": 78,
  "Mail-id": "Mail-id 20",
  "id": "20"
  }
])
db.topics.insertMany([
  {
      "Name":"Topic 1",
      "Date": new Date(),
      "mentor": ObjectId("62d2bb711e483becbeb51327"),
      "studentsAttended":['ObjectId("62d2b9651e483becbeb5131d")',
      'ObjectId("62d2b9651e483becbeb5131e")',
      'ObjectId("62d2b9651e483becbeb51320")',
      'ObjectId("62d2b9651e483becbeb51321")']        
  },
  {
      "Name":"Topic 2",
      "Date": new Date(),
      "mentor": ObjectId("62d2bb711e483becbeb51328"),
      "studentsAttended":['ObjectId("62d2b9651e483becbeb51323")',
      'ObjectId("62d2b9651e483becbeb51324")',
      'ObjectId("62d2b9651e483becbeb51325")',
      'ObjectId("62d2b9651e483becbeb51326")']        
  }
])
db.comp_drives.insertMany([
  {
      "name":"Company Name1",
      "Date": new Date(),
      "studentsAttended":[
          'ObjectId("62d2b9651e483becbeb5131d")',
          'ObjectId("62d2b9651e483becbeb5131e")',
          'ObjectId("62d2b9651e483becbeb51320")',
          'ObjectId("62d2b9651e483becbeb51321")'
      ]
  },
  {
      "name":"Company Name2",
      "Date": new Date(),
      "studentsAttended":[
          'ObjectId("62d2b9651e483becbeb51320")',
          'ObjectId("62d2b9651e483becbeb51321")',
          'ObjectId("62d2b9651e483becbeb51322")',
          'ObjectId("62d2b9651e483becbeb51323")'
      ]
  }
])
db.attendance.insertMany([
  {
      "Date": new Date(),
      "Topic": ObjectId("62d2cfdf1e483becbeb5132e"),
      "mentor": ObjectId("62d2bb711e483becbeb51327"), 
      "studentsAttended":['ObjectId("62d2b9651e483becbeb5131d")',
      'ObjectId("62d2b9651e483becbeb5131e")',
      'ObjectId("62d2b9651e483becbeb51320")',
      'ObjectId("62d2b9651e483becbeb51321")'] 
  },
  {
      "Date": new Date(),
      "Topic": ObjectId("62d2cfdf1e483becbeb5132f"),
      "mentor": ObjectId("62d2bb711e483becbeb51328"), 
      "studentsAttended":['ObjectId("62d2b9651e483becbeb5131d")',
      'ObjectId("62d2b9651e483becbeb5131e")',
      'ObjectId("62d2b9651e483becbeb51320")',
      'ObjectId("62d2b9651e483becbeb51321")'] 
  }
])
db.tasks.insertMany([
  {
      "Name":"Task 1",
      "Date" : new Date(),
      "students-submitted":[
          'ObjectId("62d2b9651e483becbeb5131d")',
          'ObjectId("62d2b9651e483becbeb5131e")',
          'ObjectId("62d2b9651e483becbeb51320")',
          'ObjectId("62d2b9651e483becbeb51321")']
  },
  {
      "Name":"Task 2",
      "Date" : new Date(),
      "students-submitted":[
          'ObjectId("62d2b9651e483becbeb5131d")',
          'ObjectId("62d2b9651e483becbeb5131e")',
          'ObjectId("62d2b9651e483becbeb51320")',
          'ObjectId("62d2b9651e483becbeb51321")'
      ]
  },
  {
      "Name":"Task 3",
      "Date" : new Date(),
      "students-submitted":[
          'ObjectId("62d2b9651e483becbeb51319")',
          'ObjectId("62d2b9651e483becbeb5131a")',
          'ObjectId("62d2b9651e483becbeb5131c")',
          'ObjectId("62d2b9651e483becbeb5131b")'
      ]
  }
])
db.tasks.insertMany([
  {
      "Name":"Task 1",
      "Date" : new Date(),
      "students-submitted":[
          'ObjectId("62d2b9651e483becbeb5131d")',
          'ObjectId("62d2b9651e483becbeb5131e")',
          'ObjectId("62d2b9651e483becbeb51320")',
          'ObjectId("62d2b9651e483becbeb51321")']
  },
  {
      "Name":"Task 2",
      "Date" : new Date(),
      "students-submitted":[
          'ObjectId("62d2b9651e483becbeb5131d")',
          'ObjectId("62d2b9651e483becbeb5131e")',
          'ObjectId("62d2b9651e483becbeb51320")',
          'ObjectId("62d2b9651e483becbeb51321")'
      ]
  },
  {
      "Name":"Task 3",
      "Date" : new Date(),
      "students-submitted":[
          'ObjectId("62d2b9651e483becbeb51319")',
          'ObjectId("62d2b9651e483becbeb5131a")',
          'ObjectId("62d2b9651e483becbeb5131c")',
          'ObjectId("62d2b9651e483becbeb5131b")'
      ]
  }
])

db.users.find().toArray()
