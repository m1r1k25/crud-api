interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

class DataModel {
  public data: User[];

  constructor() {
    this.data = [];
  }

  
}

const model = new DataModel();

export default model;