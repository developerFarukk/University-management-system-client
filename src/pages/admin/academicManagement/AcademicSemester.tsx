import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";



const AcademicSemester = () => {

    const { data } = useGetAllSemestersQuery(undefined);

    console.log(data);



    return (
        <div>
            <div>
                <h1> This is AcademicSemester component </h1>
            </div>
        </div>
    );
};

export default AcademicSemester;