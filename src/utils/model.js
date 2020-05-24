export const getDrugModel = () => {
   let instanObj = {
    drugName: "",
    takingAmount: {
      num: "",
      day: ""
    },
    takingWay: "",
    startTime: "",
    endTime: "",
    staggerTaking: ""
   }
   return instanObj
}

export const drugColumnName = [
    {
      id: "numName",
      label: "序号",
      width: "60px"
    },
    {
      id: "drugName",
      label: "药物名称",
      width: "200px"
    },
    {
      id: "takingAmount",
      label: "服用剂量",
      width: "280px"
    },
    {
      id: "takingWay",
      label: "服用方式",
      width: "110px"
    },
    {
      id: "startTime",
      label: "服用日期",
      width: "140px"
    },
    {
      id: "endTime",
      label: "结束日期",
      width: "140px"
    },
    {
      id: "staggerTaking",
      label: "错开服用",
      width: "120px"
    },
    {
      id: "operation",
      label: "操作",
      width: "230px"
    }
  ]