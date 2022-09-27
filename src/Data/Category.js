// export const categoryRows = [
//   {
//     id: 1,
//     name: "بسته های سطح کارشناسی",
//   },
//   {
//     id: 2,
//     name: "بسته های سطح مدیریت",
//   },
//   {
//     id: 3,
//     name: "بسته های سنجش تمرکز",
//   },
// ];

// // mycomponent.js
// import React, { useEffect, useState} from 'react';
// import axios from 'axios';

// <<<<<<< HEAD
// const MyComponent = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const fetchData = async () =>{
//       setLoading(true);
//       try {
//         const {data: response} = await axios.get('/stuff/to/fetch');
//         setData(response);
//       } catch (error) {
//         console.error(error.message);
//       }
//       setLoading(false);
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//     {loading && <div>Loading</div>}
//     {!loading && (
//       <div>
//         <h2>Doing stuff with data</h2>
//         {data.map(item => (<span>{item.name}</span>))}
//       </div>
//     )}
//     </div>
//   )
// }

// export default MyComponent;

export const categoryRows = [
  {
    id: 1,
    name: "بسته های سطح کارشناسی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، وبا استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه ومجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلیتکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهایکاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال وآینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
    picture: "picture.jpg",
    backgroundPicture: "backgroundPicture.jpg",
  },
  {
    id: 2,
    name: "بسته های سطح مدیریت",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، وبا استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه ومجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلیتکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهایکاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال وآینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
    picture: "picture.jpg",
    backgroundPicture: "backgroundPicture.jpg",
  },
  {
    id: 3,
    name: "بسته های سنجش تمرکز",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، وبا استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه ومجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلیتکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهایکاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال وآینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
    picture: "picture.jpg",
    backgroundPicture: "backgroundPicture.jpg",
  },
];
