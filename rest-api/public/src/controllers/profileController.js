const Profile = require('../models/Profile');
const User = require('../models/User');

// Update profile image
exports.updateProfileImage = async (req, res) => {
  const { userId, image } = req.body;

  if (!userId || !image) {
    return res.status(400).json({ message: 'Missing userId or image' });
  }

  try {
    // Busca o profile do usuário
    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      // Se não existir, cria um novo
      profile = new Profile({ user: userId, profileImage: image });
    } else {
      profile.profileImage = image;
    }

    await profile.save();

    // Garante que a referência do profile esteja no usuário
    const user = await User.findById(userId);
    if (user && !user.profile) {
      user.profile = profile._id;
      await user.save();
    }

    res.status(200).json({ message: 'Profile image updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Error updating profile image' });
  }
};

// Update additional profile information
exports.updateProfile = async (req, res) => {
  const { userId, address, phone } = req.body;

  try {
    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      profile = new Profile({ user: userId, address, phone });
    } else {
      profile.address = address || profile.address;
      profile.phone = phone || profile.phone;
    }

    await profile.save();

    // Garante que a referência do profile esteja no usuário
    const user = await User.findById(userId);
    if (user && !user.profile) {
      user.profile = profile._id;
      await user.save();
    }

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
