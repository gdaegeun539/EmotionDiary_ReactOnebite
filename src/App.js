import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    emotion: 0,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    emotion: -1,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    emotion: -21,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
