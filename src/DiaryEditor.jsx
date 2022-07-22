import { useRef, useState } from "react";

function DiaryEditor({ onCreate }) {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  function handleEventChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value, // 괄호 표기법을 이용해 조건문 없이 작성
    });
  }

  function handleSubmit(e) {
    if (state.author.length < 1) {
      // 포커싱 해주기
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("일기를 저장했어요.");

    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          type="text"
          ref={authorInput}
          value={state.author}
          onChange={handleEventChange}
        />
      </div>
      <div>
        <textarea
          name="content"
          type="text"
          ref={contentInput}
          value={state.content}
          onChange={handleEventChange}
        />
      </div>
      <div>
        <span>오늘의 감정점수: </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleEventChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
}

export default DiaryEditor;
