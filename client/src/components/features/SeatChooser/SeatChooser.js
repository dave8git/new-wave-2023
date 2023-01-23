import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeatsRequest, getRequests } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import socket from 'socket.io-client';


const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const [io, setIO] = useState(socket());
  const [localSeats, setLocalSeats] = useState([]);
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  
  useEffect(() => {
    dispatch(loadSeatsRequest());
  }, [dispatch]);

  useEffect(() => { // jeżeli re-renderujesz komponent, to jeżeli io zmieniło swoją wartość wejdź do środka i odpal co jest w środku funkcji
      io.on('seatsUpdated', (payload) => {
        console.log('seatsUpdate', payload);
        setLocalSeats(payload);
      });
  }, []);

  useEffect(() => {
    setLocalSeats(seats);
  }, [seats])

  const isTaken = (seatId) => {
    return (localSeats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  const seatsLeft = () => {
    const day = localSeats.filter(seat => seat.day === chosenDay); // filtrujemy według wybranego dnia
    return 50-day.length;
    //console.log('left seats', 50-day.length);
    // const available = localSeats.filter(seat => seat.seat === chosenSeat);
    // console.log('localSeats', localSeats);
    // console.log('seats number', seats);
    // console.log('days left', day.length);
    // console.log('reserverd seats', localSeats.filter(seat => seat.day === chosenDay).filter(seat => seat.seat === chosenSeat));
    // console.log('seatsLeft.day', day);
    // console.log('seatsLeft.available', available);
    // .filter(jedna => funckja filtrująca).filter(druga => funkcja filtrująca)
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
      { <p>Seats available: { seatsLeft() } / 50</p> }
    </div>
  )
}

export default SeatChooser;