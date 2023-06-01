from sqlalchemy import Column, Integer, String, create_engine, and_, func, update, exists, select  
from sqlalchemy.orm import sessionmaker, declarative_base, scoped_session
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from sqlalchemy import exc, desc
import datetime

engine = create_engine(r'sqlite:///db/acompanhamentoOC.db', echo=False)
Session = sessionmaker(bind=engine)
Base = declarative_base()


class DBForm_40(Base):
    __tablename__= 'form40'
    
    id = Column(Integer, primary_key=True)
    oc = Column(Integer)
    quantidadePecas = Column(Integer)
    data = Column(String)
    
    def __repr__(self):
        return f"""
                id: {self.id}  -  Mescla: {self.mescla}, Data Preparação: {self.data_prep}, Temperatura: {self.temperatura}, 
                Umidade: {self.umidade}, CEMB: {self.cod_mp}, Lote: {self.lotemp}, Validade: {self.shelf_life}, Início Agitador: {self.ini_agitador}, 
                Término Agitador: {self.ter_agitador}, Início Mistura: {self.ini_mistura}, Término Mistura: {self.ter_mistura}, Início Diluentes: {self.ini_diluentes}, Término Diluentes: {self.ter_diluentes}, 
                Início Indução: {self.ini_inducao}, Término Indução: {self.ter_inducao}, Viscosímetro: {self.viscosimetro}, Viscosidade: {self.viscosidade},
                Proporção: {self.proporcao}, Início Adequação: {self.ini_adequacao}, Término Adequação: {self.ter_adequacao}, Pot Life: {self.pot_life}, 
                Responsável: {self.responsavel}, Id_form173: {self.track_form173}, Exceção?: {self.excessao}
                """
    
    @hybrid_property
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
    
    @classmethod
    def insert(cls, **kwargs):
        form40_instance = cls(**kwargs)

        ini_agitador = datetime.datetime.strptime(kwargs['ini_agitador'], '%H:%M').time()
        ter_agitador = (datetime.datetime.combine(datetime.date.today(), ini_agitador) + datetime.timedelta(minutes=15)).time()
        form40_instance.ter_agitador = ter_agitador.strftime('%H:%M')

        ini_mistura = datetime.datetime.strptime(kwargs['ini_mistura'], '%H:%M').time()
        ter_mistura = (datetime.datetime.combine(datetime.date.today(), ini_mistura) + datetime.timedelta(minutes=15)).time()
        form40_instance.ter_mistura = ter_mistura.strftime('%H:%M')

        ini_diluentes = datetime.datetime.strptime(kwargs['ini_diluentes'], '%H:%M').time()
        ter_diluentes = (datetime.datetime.combine(datetime.date.today(), ini_diluentes) + datetime.timedelta(minutes=15)).time()
        form40_instance.ter_diluentes = ter_diluentes.strftime('%H:%M')

        ini_inducao = datetime.datetime.strptime(kwargs['ini_inducao'], '%H:%M').time()
        ter_inducao = (datetime.datetime.combine(datetime.date.today(), ini_inducao) + datetime.timedelta(minutes=15)).time()
        form40_instance.ter_inducao = ter_inducao.strftime('%H:%M')

        ini_adequacao = datetime.datetime.strptime(kwargs['ini_adequacao'], '%H:%M').time()
        ter_adequacao = (datetime.datetime.combine(datetime.date.today(), ini_adequacao) + datetime.timedelta(minutes=15)).time()
        form40_instance.ter_adequacao = ter_adequacao.strftime('%H:%M')

        session = Session()
        session.add(form40_instance)
        session.commit()
        session.close()
    
    @classmethod
    def consulta(cls):
        conteudo  = [operador.as_dict for operador in Session.query(cls).all()]
        return conteudo
    
    @classmethod
    def consultaEspecifica(cls, coluna, valor):
        conteudo  = [i.as_dict for i in Session.query(cls).filter(getattr(DBForm_40, coluna) == valor).all()]
        return conteudo
    
    def consultaEspecificaDia():
        data_atual = datetime.now().strftime('%d-%m-%Y')
        conteudo  = [i.as_dict for i in Session.query(DBForm_40).filter(DBForm_40.data_prep.startswith(data_atual)).all()]
        return conteudo
    
    def obter_ultima_linha():
        ultima_linha = Session.query(DBForm_40).order_by(DBForm_40.Id_form_40.desc()).first().as_dict
        return ultima_linha

    def update_print(id_form173):
        with Session() as Session:
            query = update(DBForm_40).where(DBForm_40.Id_form173 == id_form173).values(print=0)
            Session.execute(query)
            Session.commit()


class OCs(Base):
    __tablename__ = 'ocs'
   
    id = Column(Integer, primary_key=True)
    mescla = Column(Integer)
    numeroForm = Column(Integer)
    solicitante = Column(String)
    codPintor = Column(Integer)
    cemb = Column(Integer)
    quantidade = Column(Integer)
    unidade = Column(String)
    data = Column(String)
    status = Column(Integer)
    mescla = Column(String)
    
    
    def to_dict(self):
        return {
            'id': self.id,
            'mescla': self.mescla,
            'numeroForm': self.numeroForm,
            'solicitante': self.solicitante,
            'codPintor': self.codPintor,
            'cemb': self.cemb,
            'quantidade': self.quantidade,
            'unidade': self.unidade,
            'data': self.data,
            'status': self.status,
            'mescla': self.mescla
        }

    def __repr__(self):
        return str(self.to_dict())