export default dataString => {
  try {
    const data = JSON.parse(dataString);
    if (Array.isArray(data)) {
      return { type: 'data', data };
    }

    if (data.event) {
      return { type: 'event', event: data.event, data };
    }
    return data;
  } catch (err) {
    console.error(err);
    return { type: 'error', data: err.message };
  }
};
