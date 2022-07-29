import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

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

  async function getData() {
    const res = await fetch(
      "http://jsonplaceholder.typicode.com/comments"
    ).then((res) => {
      return res.json();
    });

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  }

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

  // memoization 사용 useMemo: deps가 바뀔 때만 update
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작...");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  // useMemo 최적화 이후 해당상수는 더이상 상수가 아님, return값만을 갖게 됨
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 수: {goodCount}</div>
      <div>기분 나쁜 일기 수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
