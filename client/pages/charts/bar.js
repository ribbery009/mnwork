import { useEffect, useRef, useState } from "react";
import LinePage from "../../components/chart/doughnut";
import { FetchData } from '../../helpers/fetcData';
import { getQueryDate, activitySelector } from "../../helpers/functions";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf'

export default function BarPage() {

       const [initState, SetInitState] = useState(true);
       const [startDate, setStartDate] = useState(new Date());
       const [endDate, setEndDate] = useState(new Date(new Date().setDate(startDate.getDate() + 1)));
       const [optionsList, setOptionList] = useState([{ name: "összes" }, { name: "munka" }, { name: "szabad" }, { name: "beteg" }, { name: "zárva az étterem" }, { name: "nyaralás" }])
       const [defaultSelectTextState, setDefaultSelectTextState] = useState("munka");
       const [list, setList] = useState("")
       const [isLoading, setLoading] = useState(false)
       const [barChart, setBarChart] = useState(null)
       const [downloadButton, setDownloadButton] = useState(null)

       const sendRequest = async () => {

              setLoading(true)

              const activity = activitySelector(defaultSelectTextState)

              let newData = [];
              const queryStartDate = getQueryDate(startDate);
              const queryEndDate = getQueryDate(endDate);
              let data;
              try {
                     const url = `/api/time/get-time?activity=${activity}&startDate=${queryStartDate}&endDate=${queryEndDate}`;

                     data = await FetchData(url);

                     if (data && data !== "no data!" && data.length > 0) {

                            let filteredList;

                            setList(data)

                     } else {
                            setList("")
                     }
              } catch (error) {
                     console.log(error.message)
              }




              setLoading(false)
       }

       useEffect(() => {
              sendRequest()
       }, [])

       useEffect(() => {
              if (list && list !== "") {
                     // setBarChart(<Bar dataList={typeof list !== 'undefined' && list} />)
                     setBarChart(<LinePage dataList={typeof list !== 'undefined' && list}/>)
                     setDownloadButton(<button onClick={(e) => barPDF(e)}>Download</button>)
              }
       }, [list])

       const barPDF = e => {
              /////////////////////////////
              // Hide/show button if you need
              /////////////////////////////
              const fileName = "bar - " + new Date().toLocaleDateString("hu-HU") + "pdf";
              const but = e.target;
              but.style.display = "none";
              let input = window.document.getElementsByClassName("barPDF")[0];

              html2canvas(input).then(canvas => {
                     const img = canvas.toDataURL("image/png");
                     const pdf = new jsPDF("l", "pt");
                     pdf.addImage(
                            img,
                            "png",
                            input.offsetLeft,
                            input.offsetTop,
                            input.clientWidth,
                            input.clientHeight
                     );
                     pdf.save(fileName);
                     but.style.display = "block";
              });
       };

       return (
              <div className='container'>
                     <div className='row'>
                            <div className='col-wrapper col'>
                                   <div className='authWrapper'>
                                          <div className="barPDF">
                                                 {barChart}
                                          </div>
                                          <div>
                                                 {downloadButton}
                                          </div>

                                   </div>

                            </div>
                     </div>
              </div>
       );
}