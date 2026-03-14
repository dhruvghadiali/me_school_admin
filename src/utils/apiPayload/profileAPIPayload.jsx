import _ from "lodash";

const schoolAboutAPIPayload = (user, formPayload) => {
  return {
    id: _.get(user, "school.id", null),
    data: {
      about: _.chain(formPayload.about).split("\n").join(" ").trim().value(),
    },
  };
};

export { schoolAboutAPIPayload };