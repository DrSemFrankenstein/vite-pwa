import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../Redux/counterSlice';
import { Button } from 'antd';

function ReduxPage() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </div>
  );
}

export default ReduxPage;
