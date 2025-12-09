import _ from "lodash";

const eductionBoardsWithAcademicClassesAPIResponse = (data) => {
  const grouped = _.groupBy(data, (item) => item.education_board._id);

  if (!grouped || Object.keys(grouped).length === 0) {
    return [];
  } else {
    return _.map(grouped, (items) => {
      return {
        label: items[0].education_board.education_board,
        value: items[0].education_board._id,
        children: _.map(items, (item) => {
          return {
            label: item.academic_class.academic_class,
            value: item._id,
          };
        }),
      };
    });
  }
};

export { eductionBoardsWithAcademicClassesAPIResponse };
