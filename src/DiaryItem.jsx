function DiaryItem({ author, content, emotion, created_date, id, onDelete }) {
  // console.log("id :>> ", id);
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
      <div className="content">{content}</div>
      <button
        onClick={() => {
          if (window.confirm(`일기(id: ${id})를 삭제할까요?`)) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
}

export default DiaryItem;
