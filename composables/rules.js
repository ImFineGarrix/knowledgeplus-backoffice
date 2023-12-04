export const useFormRules = () => {
  return {
    ruleRequired: (v) => !!v || "Required",
    ruleEmail: (v) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || "Enter a valid email";
    },
    ruleArray: (v) => {
      if (!v.length) {
        return "Required"
      }
      return true
    },
    ruleWhiteSpace: (v) => {
      const pattern = /\s/
      return pattern.test(v) || "Empty space not allow"
    }
  };
};