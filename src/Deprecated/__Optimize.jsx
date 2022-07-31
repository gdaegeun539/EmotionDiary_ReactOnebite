import React, { useEffect, useState } from "react";

/**
 * React.memo 학습용 파일입니다.
 * 실 프로젝트에서 사용되지 않는 파일입니다.
 */

// /**
//  * React.memo를 통해 HOC로 강화해 지정 props에 의한 렌더만 작동
//  */
// const Textview = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`Update :: Text: ${text}`);
//   });
//   return <div>{text}</div>;
// });
// /**
//  * React.memo를 통해 HOC로 강화해 지정 props에 의한 렌더만 작동
//  */
// const Countview = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`Update :: Count: ${count}`);
//   });
//   return <div>{count}</div>;
// });

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A Update :: Count: ${count}`);
  });

  return <div>{count}</div>;
});

function CounterB({ obj }) {
  useEffect(() => {
    console.log(`Counter B Update :: Count: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
}
/**
 * Memoization의 두번째 인자 함수인 비교 함수: 객체간 얕은 비교를 통한 리렌더링 방지
 */
function areEqual(prevProps, nextProps) {
  /**
   * true시 업데이트 방지
   * false시 업데이트
   */
  return prevProps.obj?.count === nextProps.obj?.count;
  //  풀어씀
  //   if (prevProps.obj?.count === nextProps.obj?.count) {
  //     return true;
  //   }
  //   return false;
}

const MemoizedCounterB = React.memo(CounterB, areEqual);

function OptimizeTest() {
  const [count, setCount] = useState(1);
  //   const [text, setText] = useState("");
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      {/* <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button
          onClick={() => {
            setCount(count);
          }}
        >
          A Button
        </button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() => {
            setObj({
              count: obj.count,
            });
          }}
        >
          B Button
        </button>
      </div>
    </div>
  );
}

export default OptimizeTest;
