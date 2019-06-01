import { useState, useEffect } from 'react';
import { ConfigApi } from 'Api/ConfigApi';

export default function useApiConfig(configId: number) {
  const [configData, setConfigData] = useState<any[]>([])

  useEffect(() => {
    const effect = async () => {
      const response = await ConfigApi.getConfig(configId)
      if (response.status !== 200) return
      setConfigData(response.data.map((config: any) => ({ value: config.ConfigId, name: config.ConfigName })))
    }
    effect()
  }, [])

  return configData
}
