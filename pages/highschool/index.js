import Head from "next/head";
import { NavBar } from "../../components";
import styles from "../profile.module.scss";
import colors from "../../styles/colors.module.scss";
import { Chart } from "../../components";
import { BottomNav } from "../../components";
import { getSortedHighschoolData } from "../../lib/sort/getSortedHighschoolData";

export const getStaticProps = async () => {
  const data = await getSortedHighschoolData();
  return {
    props: {
      ...data,
    },
  };
};

export default function Highschool(data) {
  const colorTheme = [
    colors.highschool1,
    colors.highschool2,
    colors.highschool3,
    colors.highschool4,
    colors.highschool5,
  ];

  const averageData = {
    label: data.averages,
    val: data.averageValues,
    color: colorTheme[3],
    title: "High School Admission Averages",
    n: data.averageRespondents,
    xAxis: "Average (%)",
    yAxis: "Number of Students",
  };

  const extraNumData = {
    label: data.extracurricularNum,
    val: data.extraNumValues,
    color: colorTheme[3],
    title: "Number of Extracurriculars We Were Part of in High School",
    n: data.extraNumRespondents,
    xAxis: "Number of Extracurriculars",
    yAxis: "Number of Students",
  };

  const extraTypeData = {
    label: data.extracurricularType,
    val: data.extraTypeValues,
    color: colorTheme[3],
    title: "Extracurriculars Types",
    n: data.extraTypeRespondents,
    xAxis: "Extracurricular Type",
    yAxis: "Number of Students",
  };

  const extraRoleData = {
    label: data.extraRoleUniques,
    val: data.extraRoleValues,
    color: colorTheme[3],
    title: "Extracurricular Roles",
    n: data.extraRoleRespondents,
    xAxis: "Extracurricular Role",
    yAxis: "Number of Students",
  };

  const enrichData = {
    label: data.enrichUniques,
    val: data.enrichValues,
    color: colorTheme[3],
    title: "High School Enrichment Programs",
    n: data.enrichRespondents,
    xAxis: "Number of Students",
    yAxis: "Enrichment Program",
  };

  const postChoiceData = {
    label: data.postChoice,
    val: data.postChoicesValues,
    color: colorTheme,
    title: "Post Secondary Choices",
    n: data.postChoicesRespondents,
  };

  const sydeBoolData = {
    label: data.sydeBools,
    val: data.sydeBoolValues,
    color: [colorTheme[3], colorTheme[2]],
    title: "Was SYDE our top choice?",
    n: data.sydeBoolRespondents,
  };

  const topChoiceData = {
    label: data.topChoices,
    val: data.topChoiceValues,
    color: colorTheme[1],
    title: "Top Choices",
    n: data.topChoiceRespondents,
  };

  const considerData = {
    label: data.considers,
    val: data.considerValues,
    color: colorTheme,
    title: "Consideration",
    n: data.considerRespondents,
  };

  const decisionData = {
    label: data.decisions,
    val: data.decisionValues,
    color: [...colorTheme].reverse(),
    title: "When did we decide we wanted to go into SYDE?",
    n: data.decisionRespondents,
  };

  const prepData = {
    label: data.preparation,
    val: data.prepareValues,
    color: colorTheme[3],
    title: "How well did high school prepare us for SYDE?",
    n: data.prepareRespondents,
    xAxis: "Level of Preparedness",
    yAxis: "Number of Students",
  };

  return (
    <>
      <Head>
        <title>High School | SYDE '27</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className={`${styles.content} ${styles.highschool}`}>
        <h2>High School</h2>
        <h4>What were we up to in high school?</h4>
        <br />

        <h3>High School Admission Average</h3>
        <div className={styles.doubleChart}>
          <Chart type="histogram" data={averageData} layout="double" />
          <p className={styles.text}>
            The admission average for SYDE 2027 was (insert average) %. Some
            more text about interesting admission average facts blah blah blah.
          </p>
        </div>
        <br />

        <h3>Enrichment Programs</h3>
        <div className={styles.singleChart}>
          <Chart type="horizontalBar" data={enrichData} layout="single" />
        </div>
        <br />

        <h3>Extracurriculars</h3>
        <p className={styles.text}>
          Add some interesting text about extra curriculars. Blah blah blah.
        </p>
        <div className={styles.singleChart}>
          <Chart type="bar" data={extraTypeData} layout="single" />
        </div>
        <div className={styles.doubleChart}>
          <Chart type="bar" data={extraRoleData} layout="double" />
          <Chart type="bar" data={extraNumData} layout="double" />
        </div>

        <h3>Other Universities We Considered</h3>
        <p className={styles.text}>
          Some text about university considerations. State some interesting
          facts or jokes about these unis. idk
        </p>
        <div className={styles.singleChart}>
          <div className={styles.uniConsiderationsContainer}>
            <img
              src="/assets/uniConsiderations.png"
              alt="other university considerations"
              className={styles.uniConsiderations}
            />
          </div>
        </div>
        <br />

        <h3>Top Choice</h3>
        <div className={styles.doubleChart}>
          <Chart type="pie" data={sydeBoolData} layout="double" />
          <p className={styles.text}>
            Some interesting text. Maybe a clever joke about SYDE.
          </p>
        </div>
        <p className={styles.text}>
          For those of us who said SYDE was not our top choice, these are the
          programs we were striving for in high school.
        </p>
        <div className={styles.topChoiceContainer}>
          <img
            src="/assets/topChoice.png"
            alt="top choice programs"
            className={styles.topChoice}
          />
        </div>
        <br />

        <h3>Miscellaneous</h3>
        <p className={styles.text}>
          Some insight on how high school influenced our SYDE experience. Most
          of us decided we wanted to be part of the SYDE gang in our final year
          of high school, but one person has had their heart set on SYDE before
          even entering grade 9!
        </p>
        <div className={styles.doubleChart}>
          <Chart type="doughnut" data={decisionData} layout="double" />
          <Chart type="histogram" data={prepData} layout="double" />
        </div>

        <BottomNav currentPage="highschool" />
      </div>
      
    </>
  );
}
