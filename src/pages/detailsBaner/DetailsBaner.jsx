import { useState } from "react";
import "./style.scss";
import ContentWrapper from "./../../components/contentWrapper/ContentWrapper";
import { useParams } from "react-router-dom";
import useFetch from "./../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "./../../components/lazyLoadImage/Img";
import posterFallback from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "./../../components/genres/Genres";
import CircleRating from "./../../components/circleRating/CircleRating";
import PlayIcon from "../details/PlayIcon";
import VidepPopup from "./../../components/videoPopup/VidepPopup";

const DetailsBaner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? `${minutes}m` : ""}`;
  };

  const director = crew?.filter((j) => j?.job === "Director");
  const writer = crew?.filter(
    (j) => j?.job === "Screenplay" || j?.job === "Story" || j?.job === "Writer"
  );

  return (
    <>
      <div className="detailsBanner">
        {!loading ? (
          <>
            {!!data && (
              <>
                <div className="backdrop-img">
                  <Img src={url?.backdrop + data?.backdrop_path} />
                </div>
                <div className="opacity-layer"></div>
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data?.poster_path ? (
                        <Img
                          className="posterImg"
                          src={url?.backdrop + data?.poster_path}
                        />
                      ) : (
                        <Img className="posterImg" src={posterFallback} />
                      )}
                    </div>

                    <div className="right">
                      <div className="title">
                        {`${data?.name || data?.title}
                            (${dayjs(data?.release_date).format("YYYY")})`}
                      </div>
                      <div className="subtitle">{data?.tagline}</div>
                      <Genres data={_genres} />
                      <div className="row">
                        <CircleRating rating={data?.vote_average?.toFixed()} />
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video?.key);
                          }}>
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>
                      {/* Overview */}
                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{data?.overview}</div>
                      </div>
                      {/* Info */}
                      <div className="info">
                        {data?.status && (
                          <div className="infoItem">
                            <span className="text bold">Status: </span>
                            <span className="text">{data?.status}</span>
                          </div>
                        )}
                        {data?.release_date && (
                          <div className="infoItem">
                            <span className="text bold">Release Date: </span>
                            <span className="text">
                              {dayjs(data?.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data?.runtime && (
                          <div className="infoItem">
                            <span className="text bold">Runtime: </span>
                            <span className="text">
                              {toHoursAndMinutes(data?.runtime)}
                            </span>
                          </div>
                        )}
                      </div>

                      {director?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Director: </span>
                          <span className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d?.name}
                                {director?.length - 1 !== i && ",    "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {writer?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Writer</span>
                          <span className="text">
                            {writer?.map((w, i) => (
                              <span key={i}>
                                {w?.name}
                                {writer?.length - 1 !== 1 && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {data?.created_by?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Creator: </span>
                          <span className="text">
                            {data?.created_by?.map((c, i) => (
                              <span key={i}>
                                {c?.name}
                                {data?.created_by?.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </ContentWrapper>
                <VidepPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </>
            )}
          </>
        ) : (
          <div className="detailsBannerSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsBaner;
