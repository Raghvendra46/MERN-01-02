const marksheet = require("../model/marksheet");

const addMarksheet = (marksheetData) => {
  return findByRollNo({ rollNo: marksheetData.rollNo }).then(
    (existingMarksheet) => {
      if (existingMarksheet) {
        return {
          message: "Marksheet already exists, please enter different data",
        };
      } else {
        const newMarksheet = new marksheet(marksheetData);
        return newMarksheet.save().then((savedMarksheet) => {
          return {
            marksheet: savedMarksheet,
            message: "Marksheet created successfully",
          };
        });
      }
    }
  );
};

const updateMarksheet = (marksheetId, marksheetData) => {
  return marksheet
    .findByIdAndUpdate(marksheetId, marksheetData)
    .then((updateMarksheet) => {
      if (!updateMarksheet) {
        throw new Error("Marksheet not found");
      } else {
        return { message: "Marksheet updated Successfully" };
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const deleteMarksheet = (marksheetId) => {
  return marksheet
    .findByIdAndDelete(marksheetId)
    .then((deletedMarksheet) => {
      if (!deletedMarksheet) {
        throw new Error("Marksheet has already been deleted");
      } else {
        return { message: "Marksheet deleted successfully" };
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const getMarksheetById = (marksheetId) => {
  return marksheet
    .findById(marksheetId)
    .then((marksheet) => {
      if (!marksheet) {
        return "Marksheet not found";
      } else {
        return marksheet;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const searchMarksheet = (query) => {
  return marksheet
    .find(query)
    .then((marksheets) => {
      if (!marksheets) {
        throw new Error({ error: "Marksheet not found" });
      } else {
        return marksheets;
      }
    })
    .catch((error) => {
      throw new Error({ error: error.message });
    });
};

const findByRollNo = (rollNo) => {
  return marksheet.findOne(rollNo).then((marksheet) => {
    if (!marksheet) {
      return null;
    } else {
      return marksheet;
    }
  });
};

const getMeritList = (limit) => {
  return marksheet
    .find({
      physics: { $gt: 60 },
      chemistry: { $gt: 60 },
      maths: { $gt: 60 },
    })
    .sort({ totalMarks: -1 })
    .limit(limit)
    .then((marksheets) => {
      if (!marksheets) {
        throw new Error("Record not found");
      } else {
        return marksheets;
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

module.exports = {
  addMarksheet,
  updateMarksheet,
  deleteMarksheet,
  getMarksheetById,
  searchMarksheet,
  findByRollNo,
  getMeritList,
};
