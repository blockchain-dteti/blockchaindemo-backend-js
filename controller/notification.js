const { Notification } = require("../model/notificationModel");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      attributes: ["userID"],
    });
    res.json(notifications);
  } catch (error) {
    console.error(error);
  }
};

exports.newNotifications = async (req, res) => {
  const { userID, notificationsType, message, time } = req.body;
  try {
    await Notification.create({
      userID: userID,
      notificationsType: notificationsType,
      message: message,
      time: time,
    });
    res.json({ msg: "Notifications Ditambahkan" });
  } catch (error) {
    console.error(error);
  }
};

exports.updateNotifications = async (req, res) => {
  const { id, userID, notificationsType, message, time } = req.body;
  try {
    await Notification.update(
      {
        userID: userID,
        notificationsType: notificationsType,
        message: message,
        time: time,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ msg: "Notifications Diupdate" });
  } catch (error) {
    console.error(error);
  }
};
