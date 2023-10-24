import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assertRouteKey } from "../Assets/Constants/Routes";
import { useServiceStore } from "../Store/Service.store";
import { configService } from "../Services/Config.service";

export default function useServiceCheck() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setHasService = useServiceStore((state) => state.setHasService);
  const { data: connectionHomeResult } = useQuery({
    queryKey: ["home"],
    queryFn: (): Promise<{ result: string }> => {
      return new Promise<{ result: string }>((resolve, reject) => {
        configService
          .home()
          .then((response) => resolve({ result: response }))
          .catch((err) => reject(err));
      });
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!!connectionHomeResult) {
      if (connectionHomeResult.result !== "Home") {
        setHasService(false);
        if (pathname !== "/") {
          navigate(`/`);
        }
      } else {
        setHasService(true);
      }
    }
  }, [connectionHomeResult]);
}
