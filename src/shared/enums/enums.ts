export enum STATUS {
  NOTFOUND = "notFound",
  ERROR = "error",
  SUCCESS = "success",
}

export enum STEP {
  FIRST,
  SECONDE,
}

console.log("STATUS.SUCCESS", STEP.FIRST ? STATUS.SUCCESS : STATUS.ERROR);
