import './App.css';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useEffect, useRef, useState } from 'react';
const contentful = require('contentful')

function App() {
  const [resumeDetails, setResumeDetails] = useState({})
  const client = contentful.createClient({
    space: '0zzz4ovgb37e',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'VmPMWEPU8Rk7VYLxnEToG33DXEWoUk6N1-gQMkfmLmg'
  })

  useEffect(() => {
    client.getEntry('7Ctd2S4iB1UDLfKfGikqts')
      .then((entry) => { setResumeDetails(entry.fields); })
      .catch(console.error)
  }, []);

  const pdfExportComponent = useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <div className="App">
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div className='mainContainer'>
          <div className='leftContainer'>
            <p className="candidateName"> {resumeDetails.candidateName}
            </p>
            <p>
              <span className="fieldTitletop">Email: </span>
              <span className="emailfield">{resumeDetails.email}</span>
            </p>
            <p><span className="fieldTitletop">Contact: +91{resumeDetails.contact}</span></p>
            <hr />
            <p className="fieldTitle">Objective: </p><p>{resumeDetails.objective}</p>
            <hr />
            <p className="fieldTitle">Career Summary:</p>
            <p>{resumeDetails?.career_summary?.title}</p>
            <ul>
              {
                resumeDetails?.career_summary?.subPoints.map(pt => {
                  return <li>{pt}</li>
                })
              }
            </ul>
            <hr />
            <p className="fieldTitle">Skills</p>
            <table>
              <tr>

                {resumeDetails?.skills && Object.keys(resumeDetails?.skills).map(title =>

                  
                  <tr><th>{title}</th>
<td>

{resumeDetails?.skills[`${title}`]}
</td>             
                  </tr>
                )}
               </tr>
            </table>
            <hr />
            <p className="fieldTitle">Project Details</p>
            {resumeDetails?.projectDetails && Object.values(resumeDetails?.projectDetails).map(detail => {
              return (
                <>
                  <p>{detail["Company_Name"]}
                    <span>{detail["start_date"]}-{detail["end_date"]}</span>
                  </p>
                  {detail.projects.map(det => (
                    <>
                      {det['project_title']}
                      <p>role: {det['role']}</p>
                      <p>Team Size: {det['team_size']}</p>
                      <p>{det['project_description']}</p>
                      <table>
                        <tr>
                          <th> My Contribution</th>
                          <td><ul>
                            {det['my_contribution']?.map(contibution => (
                              <li>{contibution}</li>
                            ))}
                          </ul></td>
                        </tr>
                        {det['development_tools'] && <tr>
                          <th> Development Tools</th>
                          <td>
                            {det['development_tools']?.map(dtool => <span> {dtool}, </span>)}
                          </td>
                        </tr>}
                      </table>
                    </>
                  ))}
                </>
              )
            })}
            <hr />
            <p className="fieldTitle">Education</p>
            <table>
                {
                  resumeDetails?.education && (
                        Object?.keys(resumeDetails?.education[0]).map(edTitle => <th>{edTitle}</th>)
                  )
                }
                 {resumeDetails?.education && resumeDetails?.education.map(ed => (
                  <tr>{Object.values(ed).map(edValues => <td>{edValues}</td>)}</tr>
                ))}
            </table>
            <hr />
            <p className="fieldTitle">Personal Details</p>
            <p>Date of Birth: {resumeDetails?.personalDetails?.date_of_birth}</p>
            <p>Languages known: {resumeDetails?.personalDetails?.languages_known}</p>
            <p>Gender: {resumeDetails?.personalDetails?.gender}</p>
            <p>{resumeDetails?.personalDetails?.state_country} - <span>{resumeDetails?.personalDetails?.pin_code}</span> </p>
          </div>

        </div>
      </PDFExport>
      <button className='downloadbutton' onClick={() => exportPDFWithComponent()}>Download to Pdf</button>
    </div>
  );
}

export default App;
