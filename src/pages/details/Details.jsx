import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./../../hooks/useFetch";
import DetailsBaner from "./../detailsBaner/DetailsBaner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Similar from './carousels/Similar';
import Recommendations from './carousels/Recommendations';

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBaner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
