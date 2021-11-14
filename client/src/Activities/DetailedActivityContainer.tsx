import { lazy, Suspense, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Activity } from "../Shared/types";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const DetailedActivity = lazy(() => import("./DetailedActivity"));

const DetailedActivityContainer = () => {
  const navigate = useNavigate();
  const { activityId } = useParams<any>();

  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    loadActivities(activityId ?? "");
  }, [activityId]);

  async function loadActivities(id: string) {
    const response = await fetch(baseUrl + "/activities/" + id);
    const json = await response.json();

    setActivity(json);
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <Suspense fallback={<></>}>
      <DetailedActivity activity={activity} handleGoBack={goBack} />
    </Suspense>
  );
};

export default DetailedActivityContainer;
