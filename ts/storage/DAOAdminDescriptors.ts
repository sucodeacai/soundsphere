class DAOAdminDescriptors extends DAO{
    soundSphereDBToJson () {
        return new SoundSphereBD([], [], this.listSemanticDescriptors, this.soundSphereInfo, this.sessionControl);
    };
}
