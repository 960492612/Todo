const STATUS = {
  active: 0,
  pause: 1, //暂停的事件
  finished: 2,
  cancel: 3, //取消的事件
  error: 4
};
const COLORS = ["blue", "yellow", "green", "gray", "red"];
export class Todo {
  constructor({ title, info, begin }) {
    this.id = begin.getTime();
    this.title =  title && title.length > 0 ? title : "暂无标题";
    this.info = info && info.length > 0 ? info : "暂无详细说明";
    this._begin = begin;
    this._end = null;
    this.children = [];
    this._weight = 1; //default
    this._status = STATUS["active"];
    this.parent = {
      time: {
        begin: null,
        end: null
      }
    };
  }
  set end(time) {
    let temp = time ? time : new Date();
    this._end = temp;
    this.children.forEach(item => {
      item.parent.time.end = temp;
    });
  }
  get end(){
    return this._end
  }
  get begin(){
    return this._begin
  }
  set status(status) {
    this.status = STATUS[status] ? STATUS[status] : STATUS["active"];
  }
  get status(){
    return this._status
  }
  set weight(weight) {
    this._weight = weight;
  }
  get weight(){
    return this._weight
  }
  getWidthPercent() {
    if (!this.parent.time.begin) {
      return 1;
    }
    let end = this._end ? this._end : new Date().getTime();
    let begin = this._begin.getTime();
    let __end = this.parent.time.end
      ? this.parent.time.end.getTime()
      : new Date().getTime();
    let __begin = this.parent.time.begin.getTime();
    return Number(((end - begin) / (__end - __begin)).toFixed(2));
  }
  getStatusColor() {
    return COLORS[this.status];
  }
  addTodoItem(item) {
    item instanceof TodoItem &&
      this.children.push(
        (() => {
          item.parent.time = { begin: this.begin, end: this.end };
          return item;
        })()
      );
  }
  deleteTodoItem(id) {
    this.children = this.children.filter(item => {
      return item.id != id;
    });
  }
}
