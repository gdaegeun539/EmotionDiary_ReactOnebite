import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import LifeCycle from "./LifeCycle";

// const dummyList = [
//   {
//     id: 1,
//     author: "Lorem ipsum",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
//     emotion: 0,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "Lorem ipsum",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
//     emotion: -1,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "Lorem ipsum",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
//     emotion: -21,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0); // DOM을 가리키지 않고 0을 가리킴으로써 상수 사용: 일반변수는 매번 같은 상태에서 시작해버림

  function onCreate(author, content, emotion) {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataId.current++,
      author: author,
      content: content,
      emotion: emotion,
      created_date: created_date,
    };

    setData([newItem, ...data]); // 아이템들 순서를 배열 순서를 이용: 새 일기를 맨 위에 배치
  }

  function onRemove(targetId) {
    alert(`일기(id: ${targetId})를 삭제했어요.`);
    const newDirayList = data.filter((it) => it.id !== targetId); // 배열 필터링을 활용한 새 배열 사용
    setData(newDirayList);
  }

  // 매번 반환하니까 일치하는거는 풀고 내용만 바꿔주기, 안일치하는거는 그냥 뱉어주기
  function onEdit(targetId, newContent) {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }

  return (
    <div className="App">
      <LifeCycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
