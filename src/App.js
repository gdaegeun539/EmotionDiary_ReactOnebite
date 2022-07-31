import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };

      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      // 매번 반환하니까 일치하는거는 풀고 내용만 바꿔주기, 안일치하는거는 그냥 뱉어주기
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []); // dispatch는 함수형 update와 무관: useCallback의 deps는 관심사가 아님
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

    dispatch({ type: "INIT", data: initData });
  }

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        author: author,
        content: content,
        emotion: emotion,
      },
    });

    /**
     * setData((data) => [newItem, ...data]); 사용 당시
     * 아이템들 순서를 배열 순서를 이용: 새 일기를 맨 위에 배치
     * setter에 함수형 update 적용: deps와 함수 갱신과 상관없이 항상 새 value 적용
     */
  }, []);

  const onRemove = useCallback((targetId) => {
    alert(`일기(id: ${targetId})를 삭제했어요.`);

    dispatch({ type: "REMOVE", targetId });
    /**
     * setData((data) => data.filter((it) => it.id !== targetId)); 사용 당시
     * 배열 필터링을 활용한 새 배열 사용 in 함수형 update
     */
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  // memoization 사용 useMemo: deps가 바뀔 때만 update
  const getDiaryAnalysis = useMemo(() => {
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기: {data.length}</div>
          <div>기분 좋은 일기 수: {goodCount}</div>
          <div>기분 나쁜 일기 수: {badCount}</div>
          <div>기분 좋은 일기 비율: {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
