const student = require("../model/student");

const addStudent = (studentData) => {
  return findByLoginId({ loginId: studentData.loginId })
    .then((existingStudent) => {
      if (existingStudent) {
        return {
          message:
            "Student ID already exists, please enter a different Student ID",
        };
      } else {
        const newStudent = new student(studentData);
        console.log("New Student data: " + studentData);
        return newStudent
          .save()
          .then((savedStudent) => {
            return {
              student: savedStudent,
              message: "Student added Successfully",
            };
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const updateStudent = (studentId, studentData) => {
  return student
    .findByIdAndUpdate(studentId, studentData)
    .then((updateStudent) => {
      if (!updateStudent) {
        throw new Error("Student not found");
      } else {
        return { message: "Student updated Successfully" };
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const deleteStudent = (studentId) => {
  return student
    .findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        throw new Error("Student not found/already deleted");
      } else {
        return { message: "Student deleted successfully" };
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const getStudentById = (studentId) => {
  return student
    .findById(studentId)
    .then((student) => {
      if (!student) {
        throw new Error("Student not found");
      } else {
        return student;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const searchStudent = (query) => {
  return student
    .find(query)
    .then((students) => {
      if (!students) {
        throw new Error({ error: "Student not found" });
      } else {
        return students;
      }
    })
    .catch((error) => {
      throw new Error({ error: error.message });
    });
};

const findByLoginId = (loginId) => {
  return student.findOne(loginId).then((student) => {
    if (!student) {
      return null;
    } else {
      return student;
    }
  });
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  searchStudent,
  findByLoginId,
};
