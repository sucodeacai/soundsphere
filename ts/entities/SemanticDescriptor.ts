// Classe que armazena os descritores semanticos, cada descritor semantico tem um conjunto de filtros
class SemanticDescriptor {
    name: string
    code: string
    _filters: Filter[]
    constructor(name: string, code:string, filters: Array<Filter>) {
        this.name = name
        this._filters = filters
        this.code = code
    }
    upFilter(id: number, callback: Function): void {

        this._filters = swapPosition(this._filters, id, id-1)
        callback();

    }
    downFilter(id: number, callback: Function): void {
        console.log("downFilter " + id);
        this._filters = swapPosition(this._filters, id, id + 1);
        callback();
    }
    addFilter(filter:Filter){
        this._filters.push(filter);
        console.log("AddFilter")
        console.log(this._filters);

    }

    removeFilter(id: number, callback: Function): void {
        console.log("Removendo: " + this._filters[id]);
        console.log(this._filters[id]);
        this._filters.splice(id, 1);
        callback();
    }
    getLenght(): number {
        return this._filters.length;
    }
    getFilters(): Array<Filter> {

        return this._filters;
    }
    // orderFilters(): void {
    //     this._filters.sort(function (a, b) {
    //         return a.order - b.order;
    //     });
    // }
    // move(array: Filter[], oldIndex: number, positionChange: number): Array<Filter> {
      
    //     if (oldIndex > -1) {
    //         var newIndex = (oldIndex + positionChange);

    //         if (newIndex < 0) {
    //             newIndex = 0
    //         } else if (newIndex >= array.length) {
    //             newIndex = array.length
    //         }

    //         var arrayClone = array.slice();
    //         arrayClone.splice(oldIndex, 1);
    //         arrayClone.splice(newIndex, 0, array[oldIndex]);

    //         return arrayClone
    //     }
    //     return array

    // }
    // move(arr: Array<Filter>, old_index: number, new_index: number): Array<Filter> {
    //     while (old_index < 0) {
    //         old_index += arr.length;
    //     }
    //     while (new_index < 0) {
    //         new_index += arr.length;
    //     }
    //     if (new_index >= arr.length) {
    //         var k = new_index - arr.length;
    //         while ((k--) + 1) {
    //             arr.push(undefined);
    //         }
    //     }
    //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    //     return arr;
    // }

}


function swapPosition(arr:Filter[],a:number, b:number){
    arr[a] = arr.splice(b, 1, arr[a])[0];
    return arr;
}
function getFrequency(){
    let listFrequency: number[][]=[];
    listFrequency[0]= [2.969712487160522, 3.8733958255609147, 4.834143137936458, 5, 4.877308558741857, 4.697437567624355, 4.308225821385153, 3.6540599602492208, 2.3015316747984906, 0.8364059044619954, -0.452985941275425, -1.5603807430483223, -2.507967728276408, -3.1233114169795573, -3.526645034627111, -3.6008057736886134, -3.4543883571760006, -3.015097552957876, -2.1813520842418384, -1.5915495453181439, -1.607311969920886, -2.1477127080641347, -2.8681104605258327, -3.6039770112775784, -4.322194185967988, -4.903561976032727, -5, -4.871518587695577, -4.836347493686071, -4.768909443158545, -4.727117869874143, -4.659707505780467, -4.41205933543324, -3.9284818939368984, -3.3087816365626783, -3.0184514748120588, -3.097528610296579, -3.0600070648589472, -3.148085100677403, -3.7549807553742465 ];
    listFrequency[1]= [-3.932409616138708, -4.140996671248186, -4.6546838640694315, 0, -4.803086009852019, -4.710567216003591, -4.748486457241258, -5, -4.609038672375011, -3.315190137350019, -1.8878015890846696, -0.9358375662863649, -0.40130611187190746, -0.20328360037466298, -0.10920891696649837, 0.2210892267160447, 0.7627489541601951, 1.5552207684113617, 2.42780327097748, 3.289685334565786, 3.8170940488471903, 3.793411369509432, 3.4973072034258843, 3.2678852349080123, 3.1469221625859345, 2.9186283914523594, 0, 2.5382452720476856, 2.722539569059502, 3.0342444192110407, 3.4184090529799747, 3.761561884371588, 3.7548961032054873, 3.468739232118251, 3.3116701811282976, 3.778435790522845, 4.59306440225485, 4.944149996976687, 5, 4.982960218891796 ];
    listFrequency[2]= [2.074575740308835, 3.8019727995700157, 5, 0, 4.521242519275016, 3.7008375736101886, 2.449745597902282, 0.9350261475522259, -0.34239054103092414, -1.0978012124502285, -1.3627103499087383, -1.2305641673262302, -0.9976193020063867, -0.9089246144725149, -1.2996907800165158, -1.8870351423114462, -2.3031697627032157, -2.2897037636622612, -2.1191621660621713, -2.3987383779473976, -2.773669783636068, -3.2767826556371, -3.9347047938867967, -4.711214589597282, -5, -3.9930706141244277, 0, -2.455140272579423, -2.8278840942730676, -3.347686019963656, -3.7102404171054673, -4.143706205741293, -4.39655355075521, -4.111699917611675, -3.3098291163489266, -3.15235374684107, -3.814302190400914, -3.802382940156858, -3.461163801688263, -3.193084932208773 ];
    listFrequency[3]= [-3.8101356773913335, -4.493116592954924, -4.948982022104184, -5, -4.703301351866626, -3.745092550037852, -2.3462246017657895, -1.594843518024573, -0.7985264515970619, 0.006345027240414192, 0.5646929558578939, 0.7737432109739628, 0.756960431100191, 0.4975887837290538, 0.04247263697929604, -0.4051624552437577, -0.7925070491684261, -1.2277943944718057, -1.5497543595550618, -1.2864045760802307, -0.39169923334901935, 0.9200399954330496, 2.2651421085359766, 3.0043522326838703, 3.424604869592515, 3.596434523921621, 0, 2.7300380434621307, 2.630633548705373, 2.563182776151751, 2.4369591363639023, 2.1646069128518097, 1.6525341553277884, 1.069437122528759, 0.6837195246075012, 0.6842252898251011, 1.123221295729252, 2.055371615828575, 3.6386699333266623, 5 ];
    listFrequency[4]= [2.5178682773209218, 3.467022963356101, 4.6531758064113244, 5, 4.8115651771995385, 4.405385721312319, 3.743414636320823, 2.9168678653521516, 1.7662807639350964, 0.5717540272023969, -0.6159428700185382, -1.5422049933766764, -2.195844603651482, -2.6243309556504197, -3.112310116057988, -3.712624975880367, -4.419009471309412, -5, -4.9213421077155, -4.657609896267195, -4.717022190676343, -4.816609650884829, -4.791962757546356, -4.551198368204782, -4.190463651354492, -3.816229431237836, 0, -2.914017538961292, -2.531931195734831, -2.0396189563400062, -1.6662855636796048, -1.2425325993813234, -0.6933155955057502, -0.15529121230320575, 0.19683497301006492, 0.2059831660266831, -0.10332460214360295, -0.3476948496560478, -0.4700909914134621, -0.7445567362915151 ];
    listFrequency[5]= [-4.211716659455142, -4.660317105524503, -5, 0, -4.652960118875791, -4.155422824372295, -3.4579853188846092, -2.7660919017215244, -1.5715358002560493, -0.2567529040353578, 0.756857384754831, 1.3759335354631008, 1.777132149736106, 2.025882885540964, 2.20798872477126, 2.379064457730451, 2.834811625671896, 3.5150363766163117, 3.9221159351919277, 3.9124576525198407, 3.6492188831773777, 3.4186974059515807, 3.3589070390010036, 3.5528537629499937, 4.095020039389769, 4.875568147127785, 5, 4.496520461126431, 3.890760261825643, 3.182441084044496, 2.7989101119431448, 2.635403634545473, 2.2416220461547267, 1.478562909326745, 0.5950769098970321, -0.04672988081507956, -0.48824579741087504, -0.7767325331266467, -0.9558071707833904, -0.8271523845568507 ];
    listFrequency[6]= [-0.3560145418589078, 0.0927683223388831, 0.9312449470906436, 0, 2.3340395440701087, 3.256558934171727, 4.229520187839032, 5, 4.89199246990009, 3.9058140251777673, 3.0586242532973076, 2.5407518367719306, 2.2375448855132274, 1.9514178529492465, 1.558257164687027, 1.1658594243311449, 1.126424516282204, 1.2268023135128858, 0.8332748828690051, 0.31423461324396995, 0.11869827546575618, 0.227361840514666, 0.6545868278612099, 0.6441394748464713, 0.08298217268616126, -0.8926540653522524, 0, -2.461348236854028, -2.9839099139112344, -3.592106601847176, -4.128084653788844, -4.416699077016938, -4.2975824996071745, -3.864055013456516, -3.6082247847609077, -3.9429063547285406, -4.724060136169398, -5, -4.4212961480938855, -3.1632214463080057 ];
    listFrequency[7]= [-3.335768079201273, -4.1830202004444725, -4.924905726802124, -5, -4.604312042829366, -3.96256172975094, -3.210690586401241, -2.538541567136204, -1.5699994027286697, -0.2911772714109956, 1.2410622681900985, 2.5551882889181887, 3.450567557199129, 3.848314914662666, 3.96540520873908, 4.042114025537071, 4.246183806730304, 4.556952716153223, 4.738204238845359, 4.928746951655409, 5, 4.80453686731285, 4.565917121309116, 4.359679293879345, 4.134800248521958, 3.6300274135426234, 0, 2.593705139181397, 2.449773217214682, 2.3608823986993577, 2.339640816865641, 2.358025411817939, 2.1191411069136477, 1.4811939394869178, 0.9422927501398082, 0.8273060959026868, 1.2809280381453036, 1.7466648355987857, 1.9790419882518162, 1.843744551166111 ];
    return listFrequency;
}
function getFiltersStandard(position:number){
    let filtros:Filter[] = [];
    const qStantard = 4.13;
    let frequencias = [20, 50, 83, 120, 161, 208, 259, 318, 383, 455, 537, 628, 729, 843, 971, 1114, 1273, 1452, 1652, 1875, 2126, 2406, 2719, 3070, 3462, 3901, 4392, 4941, 5556, 6244, 7014, 7875, 8839, 9917, 11124, 12474, 13984, 15675, 17566, 19682];
    frequencias.forEach((element,index) => {
        let filtro = new Filter("peaking", "Peaking", element, qStantard, getFrequency()[position][index], true);
        filtros.push(filtro);
    });
    return filtros;
}
function generatorSemaitsDescriptors() {

    // let filtros = [];
    // let lowPass = new Filter("lowpass", "Low Pass", 1100, 10, undefined, true);
    // let highPass = new Filter("highpass", "High Pass", 1200, 20, undefined, true);
    // let bandpass = new Filter("bandpass", "Band Pass", 1300, 30, undefined, true);
    // let lowshelf = new Filter("lowshelf", "Low Shelf", 1400, undefined, 140, true);
    // let highshelf = new Filter("highshelf", "High Shelf", 1500, undefined, 150, true);
    // let peaking = new Filter("peaking", "Peaking", 1600, 160, 1600, true);
    // let notch = new Filter("notch", "Notch", 1700, 70, undefined, true);
    // let allpass = new Filter("allpass", "All Pass", 1800, 80, undefined, true);
    // filtros.push(lowPass);
    let descPesado = new SemanticDescriptor('Pesado', 'PSD', getFiltersStandard(0));
    
    // filtros = [];

    // filtros.push(highPass);
    let descLeve = new SemanticDescriptor('Leve', 'LV', getFiltersStandard(1));
    
    // filtros = [];

    // filtros.push(bandpass);
    let descGrande = new SemanticDescriptor('Grande','GRD', getFiltersStandard(2));
    
    // filtros = [];

    // filtros.push(lowshelf);
     let descPequeno = new SemanticDescriptor('Pequeno', 'PQN', getFiltersStandard(3));
    
    // filtros = [];

    // filtros.push(highshelf);
    let descEscuro = new SemanticDescriptor('Escuro', 'ESR', getFiltersStandard(4));
    
    // filtros = [];

    // filtros.push( peaking);
    let descBrilhante = new SemanticDescriptor('Brilhante', 'BRT', getFiltersStandard(5));
    
    // filtros = [];

    // filtros.push( notch);
    let descQuente = new SemanticDescriptor('Quente', 'QNT', getFiltersStandard(6));
    
    // filtros = [];

    // filtros.push( allpass);
    let descFrio = new SemanticDescriptor('Frio','FR', getFiltersStandard(7));



    return [descPesado, descLeve,descGrande,descPequeno,descEscuro,descBrilhante,descQuente,descFrio];
}
