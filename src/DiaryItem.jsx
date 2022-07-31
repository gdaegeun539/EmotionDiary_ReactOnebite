import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

function DiaryItem({ author, content, emotion, created_date, id }) {
  useEffect(() => {
    console.log(`Debug>>> ${id} 아이템 렌더`);
  });

  const { onEdit, onRemove } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`일기(id: ${id})를 삭제할까요?`)) {
      onRemove(id);
    }
  };

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  function handleQuitEdit() {
    setIsEdit(false);
    setLocalContent(content);
  }

  function handleEdit() {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`일기(id:${id})를 수정할까요?`)) {
      onEdit(id, localContent);
      toggleEdit();
      alert(`일기(id:${id})를 수정했어요.`);
    }
  }

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author}|감정: {emotion}
        </span>
        <br />
        <span className="date">
          작성 날짜: {new Date(created_date).toLocaleString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제</button>
          <button onClick={toggleEdit}>수정</button>
        </>
      )}
    </div>
  );
}

export default React.memo(DiaryItem);
